import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { CryptoWalletService } from './crypto-wallet.service';

@ApiTags('Crypto Wallet')
@Controller('/crypto-wallets')
export class CryptoWalletController {
  constructor(private cryptoWalletService: CryptoWalletService) {}
}
