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

import { WalletService } from './wallet.service';
import { CreateWalletDto, UpdateWalletDto } from './wallet.dto';

@ApiTags('Wallet')
@Controller('/wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

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
  async create(@Body() createDto: CreateWalletDto): Promise<any> {
    const result = await this.walletService.create(createDto);
    return { result };
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
