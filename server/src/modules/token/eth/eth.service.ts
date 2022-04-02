import {
  CryptoWalletKeyPair,
  CryptoWalletTransactionDto,
} from '@modules/crypto-wallet';
import { Injectable } from '@nestjs/common';
import Web3 from 'web3';
import { ETHTransactionDto } from './eth.dto';

@Injectable()
export class ETHService {
  public web3: Web3;

  public name: string;
  public symbol: string;

  GAS = 21000;

  constructor() {
    const { ERC20_NODE_API_KEY, ERC20_NODE_PROVIDER } = process.env;

    this.web3 = new Web3(`${ERC20_NODE_PROVIDER}/${ERC20_NODE_API_KEY}`);
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

  async calculateTransaction({ value }: ETHTransactionDto): Promise<number> {
    try {
      const gasUsed = this.GAS;
      const gasPrice = await this.getGasPrice();
      const gas = this.web3.utils.fromWei((gasUsed * gasPrice).toString());

      const result = Number(gas) + Number(value);
      if (!result) throw Error(`Transaction Not Calculated`);

      return result;
    } catch (e) {
      console.log({ e });
      return 0;
    }
  }

  async sendTransaction({
    value,
    from,
    to,
    privateKey,
  }: ETHTransactionDto): Promise<CryptoWalletTransactionDto> {
    try {
      const { web3, GAS } = this;

      const gas = GAS;
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
      const tx = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
      if (!tx)
        throw Error(`Transaction #${signedTx.transactionHash} Not Sent!`);

      const { transactionHash, gasUsed } = tx;

      const gasPrice = await this.getGasPrice();
      const _gas = web3.utils.fromWei((gasUsed * gasPrice).toString());

      const result = {
        from,
        to,
        tx: transactionHash,
        value: Number(value),
        gas: Number(_gas),
      };

      return result;
    } catch (e) {
      console.log({ e });
    }
  }
}
