import { Injectable } from '@nestjs/common';
import Web3 from 'web3';

@Injectable()
export class ETHService {
  public web3: Web3;

  public name: string;
  public symbol: string;

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
      const wei = await this.web3.eth.getBalance(address);
      const balance = Number(this.web3.utils.fromWei(wei));

      return balance;
    } catch (e) {
      console.log({ e });
      return 0;
    }
  }
}
