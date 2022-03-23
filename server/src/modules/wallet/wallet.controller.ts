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

import { CryptoWalletService } from './../crypto-wallet';
import { WalletService } from './wallet.service';
import { CreateWalletDto, UpdateWalletDto } from './wallet.dto';

@ApiTags('Wallet')
@Controller('/wallets')
export class WalletController {
  constructor(
    private walletService: WalletService,
    private cryptoWalletService: CryptoWalletService,
  ) {}

  @Get()
  async getAll(): Promise<any> {
    const result = await this.walletService.query({});
    return { result };
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: 'integer',
  })
  async getByKey(@Param() params): Promise<any> {
    const id = Number(params.id);

    const result = await this.walletService.findOne({ id });
    if (!result) return { error: `Wallet #${id} Not Found!` };

    return { result };
  }

  @Post()
  async create(
    @Res() res: Response,
    @Body() createDto: CreateWalletDto,
  ): Promise<any> {
    // Creating Wallet
    const createdWallet = await this.walletService.create(createDto);
    if (!createdWallet)
      return res.status(400).json({ error: `Wallet Not Created!` });

    const walletId = createdWallet.id;

    // Creating BTC Wallet TODO

    // Creating Crypto Wallets
    // const ETHWallet = await this.ETHWalletService.create({ walletId });
    // const USDTWallet = await this.USDTWalletService.create({ walletId });

    // Creating USDT Wallet TODO

    return { result: createdWallet };
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: 'integer',
  })
  async update(
    @Param() params,
    @Body() updateDto: UpdateWalletDto,
  ): Promise<any> {
    const id = Number(params.id);

    // Checking Wallet
    const existedWallet = await this.walletService.findOne({ id });
    if (!existedWallet) return { error: `Wallet #${id} Not Found!` };

    // Updating Wallet
    const result = await this.walletService.update({ id }, updateDto);
    return { result };
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: 'integer',
  })
  async delete(@Param() params): Promise<any> {
    const id = Number(params.id);

    // Checking Wallet
    const existedWallet = await this.walletService.findOne({ id });
    if (!existedWallet) return { error: `Wallet #${id} Not Found!` };

    // Deleting Wallet
    const result = await this.walletService.delete({ id });
    return { result };
  }
}
