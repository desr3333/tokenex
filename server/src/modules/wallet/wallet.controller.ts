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

import {
  CryptoWalletService,
  CryptoWalletTransferDto,
} from '@modules/crypto-wallet';

import { WalletService } from './wallet.service';
import {
  CreateWalletDto,
  UpdateWalletDto,
  WalletWithdrawDto,
} from './wallet.dto';

@ApiTags('Wallet')
@Controller('/wallets')
export class WalletController {
  constructor(
    private walletService: WalletService,
    private cryptoWalletService: CryptoWalletService,
  ) {}

  @Get()
  async getAll(@Res() res: Response) {
    const result = await this.walletService.find({});
    return res.status(200).json({ result });
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param() params) {
    const { id } = params;

    const result = await this.walletService.findOne({ where: { id } });
    if (!result) return res.status(400).json({ error: `Wallet Not Created!` });

    return res.status(200).json({ result });
  }

  @Post()
  async create(@Res() res: Response, @Body() data: CreateWalletDto) {
    const result = await this.walletService.create(data);
    if (!result) return res.status(400).json({ error: `Wallet Not Created!` });

    return res.status(201).json({ result });
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: 'integer',
  })
  async update(
    @Res() res: Response,
    @Param() params,
    @Body() data: UpdateWalletDto,
  ) {
    const { id } = params.id;

    // Checking Wallet
    const existedWallet = await this.walletService.findOne({ where: { id } });
    if (!existedWallet)
      return res.status(404).json({ error: 'Wallet Not Updated!' });

    // Updating Wallet
    const result = await this.walletService.update({ where: { id }, data });
    if (!result) return res.status(400).json({ error: 'Wallet Not Updated!' });

    return res.status(200).json({ result });
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: 'integer',
  })
  async delete(@Res() res: Response, @Param() params) {
    const { id } = params.id;

    // Checking Wallet
    const existedWallet = await this.walletService.findOne({ where: { id } });
    if (!existedWallet)
      return res.status(404).json({ error: 'Wallet Not Updated!' });

    // Deleting Wallet
    const result = await this.walletService.delete({ where: { id } });
    if (!result) return res.status(400).json({ error: 'Wallet Not Updated!' });

    return res.status(200).json({ result });
  }

  @Post('withdraw')
  async withdraw(@Res() res: Response, @Body() withdrawDto: WalletWithdrawDto) {
    const { from, to, value } = withdrawDto;

    const result = await this.walletService.transfer({ from, to, value });
    if (!result) return res.status(400).json({ error: `Withdrawal Failed!` });

    return res.status(200).json({ result });
  }

  @Post('calculateTx')
  async calculateTx(
    @Res() res: Response,
    @Body() transactionDto: CryptoWalletTransferDto,
  ) {
    const result = await this.cryptoWalletService.calculateTx(transactionDto);
    if (!result)
      return res.status(404).json({ error: `Transaction Not Calculated!` });

    return res.status(200).json({ result });
  }
}
