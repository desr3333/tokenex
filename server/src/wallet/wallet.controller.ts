import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { WalletService } from './wallet.service';
import { Prisma } from '@prisma/client';

@Controller('/wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get()
  async getAll(): Promise<any> {
    const result = await this.walletService.query({});
    return { result };
  }

  @Get(':id')
  async getByKey(@Param() params): Promise<any> {
    const id = Number(params.id);

    const result = await this.walletService.findOne({ id });
    if (!result) return { error: `Wallet #${id} Not Found!` };

    return { result };
  }

  @Post()
  async create(@Body() body): Promise<any> {
    const result = await this.walletService.create(body);
    return { result };
  }

  @Put(':id')
  async update(
    @Param() params,
    @Body() updateDto: Prisma.WalletUpdateInput,
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
