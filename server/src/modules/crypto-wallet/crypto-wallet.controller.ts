import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { CryptoWallet } from '@prisma/client';
import { Response } from 'express';
import {
  CreateCryptoWalletDto,
  CryptoWalletWithdrawDto,
} from './crypto-wallet.dto';

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
  @ApiParam({
    name: 'address',
    required: true,
    type: 'string',
  })
  async findOne(@Res() res: Response, @Param() params) {
    try {
      const { address } = params;

      const cryptoWallet = await this.cryptoWalletService.findOne({ address });
      if (!cryptoWallet)
        return res
          .status(404)
          .json({ error: `Crypto Wallet ${address} Not Found!` });

      const { symbol } = cryptoWallet;
      const balance = await this.cryptoWalletService.getBalance({
        address,
        symbol,
      });

      const result = {
        ...cryptoWallet,
        balance,
      };

      return res.status(200).json({ result });
    } catch (e) {
      console.log({ e });
    }
  }

  @Post()
  async create(@Res() res: Response, @Body() createDto: CreateCryptoWalletDto) {
    try {
      const { symbol } = createDto;

      const result = await this.cryptoWalletService.create(createDto);
      if (!result)
        return res
          .status(404)
          .json({ error: `${symbol} Crypto Wallet Not Created!` });

      return res.status(200).json({ result });
    } catch (e) {}
  }

  @Put(':address')
  @ApiParam({
    name: 'address',
    required: true,
    type: 'string',
  })
  async update(
    @Res() res: Response,
    @Param() params,
    @Body() updateDto: CryptoWallet,
  ) {
    try {
      const { address } = params;

      const result = await this.cryptoWalletService.update(
        { address },
        updateDto,
      );
      if (!result)
        return res
          .status(404)
          .json({ error: `Crypto Wallet ${address} Not Updated!` });

      return res.status(200).json({ result });
    } catch (e) {}
  }

  @Post('withdraw')
  async withdraw(
    @Res() res: Response,
    @Body() withdrawDto: CryptoWalletWithdrawDto,
  ) {
    try {
      const result = await this.cryptoWalletService.withdraw(withdrawDto);
      if (!result) return res.status(400).json({ error: `Withdrawal Failed!` });

      return res.status(200).json({ result });
    } catch (e) {}
  }
}