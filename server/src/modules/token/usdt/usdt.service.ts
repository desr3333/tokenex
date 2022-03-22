import { Injectable } from '@nestjs/common';

import { ERC20Service } from './../erc20';

@Injectable()
export class USDTService extends ERC20Service {
  constructor() {
    super({ contractAddress: '0x3B00Ef435fA4FcFF5C209a37d1f3dcff37c705aD' });
  }
}
