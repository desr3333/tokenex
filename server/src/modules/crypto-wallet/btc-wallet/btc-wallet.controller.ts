import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';

import { BTCWalletService } from './btc-wallet.service';

@ApiTags('BTC Wallet')
@Controller('/crypto-wallets/btc')
export class BTCWalletController {
  constructor(private BTCWalletService: BTCWalletService) {}
}
