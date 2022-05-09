import {
  CryptoWalletKeyPair,
  CryptoWalletTransactionDto,
} from '@modules/crypto-wallet';
import { Injectable } from '@nestjs/common';
import { throws } from 'assert';
import axios from 'axios';
import Web3 from 'web3';
import { BlockchainServiceInterface } from '../blockchain.dto';

import { EthereumTransactionConfigDto } from './ethereum.dto';

const {
  ETH_NODE_API_KEY,
  ETH_EXPLORER,
  ETH_NET,
  ETH_NODE_MAINNET,
  ETH_NODE_TESTNET,
  ETH_EXPLORER_MAINNET,
  ETH_EXPLORER_TESTNET,
  ETH_EXPLORER_PUBLIC_MAINNET,
  ETH_EXPLORER_PUBLIC_TESTNET,
} = process.env;

@Injectable()
export class EthereumService implements BlockchainServiceInterface {
  web3: Web3;
  name: string;
  symbol: string;

  NET = ETH_NET;
  NODE_API_KEY = ETH_NODE_API_KEY;
  NODE = ETH_NET === 'mainnet' ? ETH_NODE_MAINNET : ETH_NODE_TESTNET;
  EXPLORER =
    ETH_NET === 'mainnet' ? ETH_EXPLORER_MAINNET : ETH_EXPLORER_TESTNET;
  EXPLORER_PUBLIC =
    ETH_NET === 'mainnet'
      ? ETH_EXPLORER_PUBLIC_MAINNET
      : ETH_EXPLORER_PUBLIC_TESTNET;

  SERVICE_FEE = 0.02; // %
  TRANSACTION_FEE = 0.00005; // 35000

  explorer = axios.create({
    baseURL: ETH_EXPLORER,
    headers: { 'api-key': ETH_NODE_API_KEY },
  });

  constructor() {
    const provider = new Web3.providers.HttpProvider(this.NODE, {
      headers: [{ name: 'api-key', value: this.NODE_API_KEY }],
    });

    this.web3 = new Web3(provider);
    this.name = 'Ethereum';
    this.symbol = 'ETH';
  }

  async create(): Promise<CryptoWalletKeyPair> {
    try {
      const account = await this.web3.eth.accounts.create();

      const { address, privateKey } = account;
      const result = { address, privateKey };

      return result;
    } catch (e) {
      console.log({ e });
      return null;
    }
  }

  async getBalance(address: string): Promise<number> {
    try {
      const { web3 } = this;

      const wei = await web3.eth.getBalance(address);
      const balance = Number(web3.utils.fromWei(wei));

      return balance;
    } catch (e) {
      console.log({ e });
      return 0;
    }
  }

  async getGasPrice(): Promise<number> {
    try {
      const price = await this.web3.eth.getGasPrice();
      const result = Number((Number(price) / 1000000000).toFixed(2));

      return result;
    } catch (e) {
      return null;
    }
  }

  async signTransaction(
    transactionDto: CryptoWalletTransactionDto,
    privateKey: string,
  ): Promise<string> {
    try {
      const { from, to, value, gas } = transactionDto;
      const nonce = await this.web3.eth.getTransactionCount(from, 'latest');

      // Signing
      const signedTx = await this.web3.eth.accounts.signTransaction(
        { value, from, to, gas, nonce },
        privateKey,
      );
      if (!signedTx) throw Error(`Transaction Not Signed!`);

      return signedTx.rawTransaction;
    } catch (e) {
      console.log({ e });
      return null;
    }
  }

  async sendTransaction(
    data: EthereumTransactionConfigDto,
  ): Promise<CryptoWalletTransactionDto> {
    try {
      const { from, to, privateKey } = data;

      // Calculating
      const calculatedTx = await this.calculateTx({
        value: data.value,
        from,
        to,
      });
      const { value, gas, fee, serviceFee, input, output } = calculatedTx;

      // Signing
      const signedTx = await this.signTransaction(calculatedTx, privateKey);

      // Sending
      const sentTx = await this.web3.eth.sendSignedTransaction(signedTx);
      if (!sentTx) throw Error(`Transaction Not Sent!`);

      const { transactionHash: hash } = sentTx;

      const explorerLink = this.generateExplorerLink(hash);

      const result = {
        value,
        from,
        to,
        hash,
        gas,
        fee,
        serviceFee,
        input,
        output,
        explorerLink,
      };

      return result;
    } catch (e) {
      console.log({ e });
    }
  }

  async calculateTx(
    transaction: EthereumTransactionConfigDto,
  ): Promise<CryptoWalletTransactionDto> {
    try {
      const { from, to, chain } = transaction;
      const tx = transaction;

      const value = Number(this.web3.utils.toWei(tx.value.toString()));
      const gas = await this.calculateFee({ ...transaction, value });
      const fee = this.fromGwei(gas);
      const input = this.toFixed(tx.value + fee, 9);
      const output = this.toFixed(tx.value, 9);

      const result = {
        chain,
        value,
        from,
        to,
        gas,
        fee,
        input,
        output,
      };

      return result;
    } catch (e) {
      console.log({ e });
      return null;
    }
  }

  async calculateFee(
    transaction: EthereumTransactionConfigDto,
  ): Promise<number> {
    try {
      const gas = Number(await this.web3.eth.estimateGas(transaction));
      const gasPrice = Number(await this.web3.eth.getGasPrice());
      const result = this.toGwei(gas * gasPrice);

      return result;
    } catch (e) {
      console.log({ e });
    }
  }

  generateExplorerLink(tx: string) {
    return `${this.EXPLORER_PUBLIC}/tx/${tx}`;
  }

  toFixed(number: number, toFixed = 0): number {
    return Number(number.toFixed(toFixed));
  }

  toGwei(wei: number): number {
    return Number((wei / 1000000000).toFixed(0));
  }

  fromGwei(gwei: number): number {
    return Number((gwei / 1000000000).toFixed(9));
  }
}
