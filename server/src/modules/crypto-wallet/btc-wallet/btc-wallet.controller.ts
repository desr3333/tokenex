import {
  Body,
  Controller,
  Delete,
  forwardRef,
  Get,
  HttpException,
  Inject,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiParam, ApiTags } from '@nestjs/swagger';

import { CreateBTCWalletDto } from './btc-wallet.dto';
import { BTCWalletService } from './btc-wallet.service';

import { BTCService } from './../../token';

@ApiTags('BTC Wallet')
@Controller('/crypto-wallets/btc')
export class BTCWalletController {
  constructor(
    private BTCWalletService: BTCWalletService,
    private BTCService: BTCService,
  ) {}

  @Post()
  async create(@Res() res: Response, @Body() createDto: CreateBTCWalletDto) {
    try {
      const { walletId } = createDto;
      const { symbol } = this.BTCWalletService;

      // Checking Wallet
      if (!walletId)
        return res.status(404).json({ error: `Wallet Not Found!` });

      // Creating Wallet
      const result = await this.BTCWalletService.create({ walletId });
      if (!result)
        return res
          .status(400)
          .json({ error: `${symbol} Crypto Wallet Not Created!` });

      return res.status(201).json({ result });
    } catch (e) {
      console.log({ e });
    }
  }
}
