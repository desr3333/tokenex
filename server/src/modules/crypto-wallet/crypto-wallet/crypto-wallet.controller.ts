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
import { CryptoWallet } from '@prisma/client';
import { Response } from 'express';

import { CryptoWalletService } from './crypto-wallet.service';

@ApiTags('Crypto Wallet')
@Controller('/crypto-wallets')
export class CryptoWalletController {
  constructor(private cryptoWalletService: CryptoWalletService) {}

  @Get()
  async getAll(@Res() res: Response) {
    try {
      const result = await this.cryptoWalletService.getAll();
      if (!result) return res.status(404).json({ result: [] });

      return res.status(200).json({ result });
    } catch (e) {
      console.log({ e });
    }
  }

  @Get(':address')
  async findOne(@Res() res: Response, @Param() params: CryptoWallet) {
    try {
      const { address } = params;

      const result = await this.cryptoWalletService.findOne({ address });
      if (!result)
        return res
          .status(404)
          .json({ error: `Crypto Wallet ${address} Not Found!` });

      return res.status(200).json({ result });
    } catch (e) {
      console.log({ e });
    }
  }
}
