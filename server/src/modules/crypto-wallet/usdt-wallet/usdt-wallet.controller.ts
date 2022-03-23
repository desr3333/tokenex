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
import { Response } from 'express';
import { ApiParam, ApiTags } from '@nestjs/swagger';

import { CreateCryptoWalletDto } from '../crypto-wallet';
import { USDTWalletService } from './usdt-wallet.service';

@ApiTags('USDT Wallet')
@Controller('/crypto-wallets/usdt')
export class USDTWalletController {
  constructor(private USDTWalletService: USDTWalletService) {}

  @Post()
  async create(@Res() res: Response, @Body() createDto: CreateCryptoWalletDto) {
    try {
      const { walletId } = createDto;
      const { symbol } = this.USDTWalletService;

      // Checking Wallet
      if (!walletId)
        return res.status(404).json({ error: `Wallet Not Found!` });

      // const existedWallet = await this.walletService.findOne({ id: walletId });
      // if (!existedWallet)
      //   return res.status(404).json({ error: `Wallet Not Found!` });

      // Creating Wallet
      const result = await this.USDTWalletService.create(createDto);
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
