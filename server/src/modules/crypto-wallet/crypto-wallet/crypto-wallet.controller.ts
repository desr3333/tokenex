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
import { CreateMultipleCryptoWalletDto } from './crypto-wallet.dto';

import { CryptoWalletService } from './crypto-wallet.service';

@ApiTags('Crypto Wallet')
@Controller('/crypto-wallets')
export class CryptoWalletController {
  constructor(private cryptoWalletService: CryptoWalletService) {}

  // @Post('initiate')
  // async initiateAll(
  //   @Res() res: Response,
  //   @Body() body: CreateMultipleCryptoWalletDto,
  // ) {
  //   const { walletId } = body;

  //   const result = await this.cryptoWalletService.generateAll({ walletId });

  //   return res.status(200).json({ result });
  // }
}
