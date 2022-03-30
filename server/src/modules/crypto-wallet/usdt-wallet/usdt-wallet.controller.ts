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
import { USDTTransferDto } from './usdt-wallet.dto';

@ApiTags('USDT Wallet')
@Controller('/crypto-wallets/usdt')
export class USDTWalletController {
  constructor(private USDTWalletService: USDTWalletService) {}

  @Get('/:address')
  async findOne(@Res() res: Response, @Param() params: { address: string }) {
    try {
      const { address } = params;
      const { symbol } = this.USDTWalletService;

      const result = await this.USDTWalletService.findOneByAddress(address);
      if (!result)
        return res
          .status(404)
          .json({ error: `${symbol} Wallet ${address} Not Found!` });

      return res.status(200).json({ result });
    } catch (e) {
      console.log({ e });
    }
  }

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

  @Post('/transfer')
  async transfer(@Res() res: Response, @Param() transferDto: USDTTransferDto) {
    try {
      const result = await this.USDTWalletService.transfer(transferDto);

      return res.status(200).json({ result });
    } catch (e) {
      console.log({ e });
    }
  }
}
