import { Injectable } from '@nestjs/common';
import Web3 from 'web3';
import { ETHTransactionDto } from './eth.dto';

@Injectable()
export class ETHService {
  public web3: Web3;

  public name: string;
  public symbol: string;

  TEST_ETH_ADDRESS = '0xD66fE26C24AA90F31eB1b1d5FD05Cd05De77Fd07';
  TEST_ETH_PRIVATE_KEY = process.env.TEST_ETH_PRIVATE_KEY;
  TEST_ETH_GAS = 45000;

  constructor() {
    const { ERC20_NODE_API_KEY, ERC20_NODE_PROVIDER } = process.env;

    this.web3 = new Web3(`${ERC20_NODE_PROVIDER}/${ERC20_NODE_API_KEY}`);
    this.name = 'Ethereum';
    this.symbol = 'ETH';
  }

  async create() {
    try {
      const account = await this.web3.eth.accounts.create();
      return account;
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

  async getGasPrice() {
    try {
      const result = await this.web3.eth.getGasPrice();
      return result;
    } catch (e) {
      return null;
    }
  }

  async sendTransaction({ value, from, to, privateKey }: ETHTransactionDto) {
    try {
      const { web3, TEST_ETH_ADDRESS, TEST_ETH_PRIVATE_KEY, TEST_ETH_GAS } =
        this;

      // const address = TEST_ETH_ADDRESS;
      // const privateKey = TEST_ETH_PRIVATE_KEY;
      const gas = TEST_ETH_GAS;

      const nonce = await web3.eth.getTransactionCount(from, 'latest');

      const transaction = {
        value: web3.utils.toWei(`${value}`),
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

      return tx;
    } catch (e) {
      console.log({ e });
    }
  }
}
