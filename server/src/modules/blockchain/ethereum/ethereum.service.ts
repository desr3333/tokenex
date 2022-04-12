import {
  CryptoWalletKeyPair,
  CryptoWalletTransactionDto,
} from '@modules/crypto-wallet';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import Web3 from 'web3';
import { TokenServiceInterface } from '../../crypto-token';
import { ETHRawTransactionDto } from './ethereum.dto';

const { ETH_NODE_API_KEY, ETH_EXPLORER } = process.env;

@Injectable()
export class EthereumService implements TokenServiceInterface {
  public web3: Web3;
  public name: string;
  public symbol: string;
  public defaultGas = 21000;

  EXPLORER = ETH_EXPLORER;

  explorer = axios.create({
    baseURL: ETH_EXPLORER,
    headers: { 'api-key': ETH_NODE_API_KEY },
  });

  constructor() {
    const { ETH_NODE_PROVIDER } = process.env;

    this.web3 = new Web3(`${ETH_NODE_PROVIDER}/${ETH_NODE_API_KEY}`);
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
      const result = await this.web3.eth.getGasPrice();
      return Number(result);
    } catch (e) {
      return null;
    }
  }

  async sendTransaction({
    value,
    from,
    to,
    privateKey,
  }: ETHRawTransactionDto): Promise<CryptoWalletTransactionDto> {
    try {
      const { web3 } = this;

      const gas = this.calculateGas(value);
      const nonce = await web3.eth.getTransactionCount(from, 'latest');

      const transaction = {
        value: web3.utils.toWei(value.toString()),
        from,
        to,
        nonce,
        gas,
      };

      // Signing
      const signedTx = await web3.eth.accounts.signTransaction(
        transaction,
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

  async calculateTx({
    value,
    from,
    to,
  }: ETHRawTransactionDto): Promise<CryptoWalletTransactionDto> {
    try {
      const gas = this.calculateGas(value);
      const gasETH = Number(this.web3.utils.fromWei(gas.toString()));

      const output = value + gasETH;

      const result = {
        value,
        from,
        to,
        gas,
        output,
      };

      return result;
    } catch (e) {
      console.log({ e });
      return null;
    }
  }

  calculateGas(value: number) {
    try {
      const result = this.defaultGas;
      return result;
    } catch (e) {
      console.log({ e });
    }
  }

  generateExplorerLink(tx: string) {
    return `${this.EXPLORER}/tx/${tx}`;
  }
}
