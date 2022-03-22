import { Injectable } from '@nestjs/common';
import Web3 from 'web3';

@Injectable()
export class ETHService {
  public web3: Web3;

  constructor() {
    const { ERC20_NODE_API_KEY, ERC20_NODE_PROVIDER } = process.env;

    this.web3 = new Web3(`${ERC20_NODE_PROVIDER}/${ERC20_NODE_API_KEY}`);
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
}
