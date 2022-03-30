import { Injectable } from '@nestjs/common';

import { ERC20Service } from '@modules/token/erc20';

import abi from './usdt.abi.json';

@Injectable()
export class USDTService extends ERC20Service {
  constructor() {
    super({
      contractAddress: '0x3B00Ef435fA4FcFF5C209a37d1f3dcff37c705aD',
      abi,
    });
  }
}
