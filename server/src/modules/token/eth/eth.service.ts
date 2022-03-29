import { Injectable } from '@nestjs/common';
import Web3 from 'web3';

@Injectable()
export class ETHService {
  public web3: Web3;

  public name: string;
  public symbol: string;

  TEST_ADDRESS = '0xD66fE26C24AA90F31eB1b1d5FD05Cd05De77Fd07';
  TEST_ETH_PRIVATE_KEY = process.env.TEST_ETH_PRIVATE_KEY;

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

  async sendTransaction(val: number, to: string) {
    try {
      const { web3, TEST_ADDRESS, TEST_ETH_PRIVATE_KEY } = this;

      const address = TEST_ADDRESS;
      const privateKey = TEST_ETH_PRIVATE_KEY;

      const nonce = await web3.eth.getTransactionCount(address, 'latest');
      const gas = 45000;
      const value = web3.utils.toWei(`${val}`);
      const from = address;

      const transaction = {
        from,
        to,
        value,
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
