import { Injectable } from '@nestjs/common';

import { ERC20Service } from './../erc20';

@Injectable()
export class USDTService extends ERC20Service {
  constructor() {
    super({ contractAddress: '0x3B00Ef435fA4FcFF5C209a37d1f3dcff37c705aD' });
  }

  async create() {
    try {
      //  const account = await this.web3.eth.Contract({});
      // return { account };
    } catch (e) {
      console.log({ e });
      return null;
    }
  }

  async getBalance(address: string): Promise<any> {
    try {
      const balance = await this.contract.methods.balanceOf(address).call();
      const decimals = await this.contract.methods.decimals(address).call();

      return { balance, decimals };
    } catch (e) {
      console.log({ e });
      return null;
    }
  }
}
