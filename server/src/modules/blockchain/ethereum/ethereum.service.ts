import {
  CryptoWalletKeyPair,
  CryptoWalletTransactionDto,
} from '@modules/crypto-wallet';
import { Injectable } from '@nestjs/common';
import { throws } from 'assert';
import axios from 'axios';
import Web3 from 'web3';
import { TokenServiceInterface } from '../../crypto-token';
import { ETHRawTransactionDto } from './ethereum.dto';

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
export class EthereumService implements TokenServiceInterface {
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

  GAS = 35000;

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

  async sendTransaction({
    privateKey,
    value,
    from,
    to,
    gas,
  }: ETHRawTransactionDto): Promise<CryptoWalletTransactionDto> {
    try {
      const { web3 } = this;

      const nonce = await web3.eth.getTransactionCount(from, 'latest');

      // Calculating
      const calculatedTx = await this.calculateTx({
        value,
        from,
        to,
        nonce,
      });

      console.log({ calculatedTx });

      // Signing
      const signedTx = await web3.eth.accounts.signTransaction(
        calculatedTx,
        privateKey,
      );
      if (!signedTx) throw Error(`Transaction Not Signed!`);

      // Sending
      const sentTx = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
      );
      if (!sentTx)
        throw Error(`Transaction #${signedTx.transactionHash} Not Sent!`);

      const { transactionHash: tx } = sentTx;

      const explorerLink = this.generateExplorerLink(tx);

      const result = {
        from,
        to,
        value: Number(value),
        gas,
        tx,
        explorerLink,
      };

      return result;
    } catch (e) {
      console.log({ e });
    }
  }

  async calculateTx(
    data: ETHRawTransactionDto,
  ): Promise<CryptoWalletTransactionDto> {
    try {
      const value = Number(this.web3.utils.toWei(data.value.toString()));
      const gas = this.calculateGas();
      const output =
        Number(this.web3.utils.fromWei(value.toString())) +
        Number(this.web3.utils.fromWei(gas.toString()));

      const result = {
        ...data,
        value,
        gas,
        output,
      };

      return result;
    } catch (e) {
      console.log({ e });
      return null;
    }
  }

  calculateGas(): number {
    try {
      return this.GAS;
    } catch (e) {
      console.log({ e });
    }
  }

  generateExplorerLink(tx: string) {
    return `${this.EXPLORER_PUBLIC}/tx/${tx}`;
  }
}
