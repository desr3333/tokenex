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

import { AccountService } from '@modules/account';

import {
  CreateTelegramAccountDto,
  QueryTelegramAccountDto,
  UpdateTelegramAccountDto,
} from './telegram-account.dto';
import { TelegramAccountService } from './telegram-account.service';
import { WalletService } from '@modules/wallet';

@ApiTags('TelegramAccount')
@Controller('/telegram-accounts')
export class TelegramAccountController {
  constructor(
    private telegramAccountService: TelegramAccountService,
    private accountService: AccountService,
    private walletService: WalletService,
  ) {}

  @Get()
  async find(@Res() res: Response) {
    const result = await this.telegramAccountService.find({});
    return res.status(200).json({ result });
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: 'integer',
  })
  async findById(@Res() res: Response, @Param() params) {
    try {
      const id = Number(params.id);

      const result = await this.telegramAccountService.findOne({
        where: { id },
        include: { account: true },
      });
      if (!result)
        return res
          .status(404)
          .json({ error: `Telegram Account #${id} Not Found!` });

      return res.status(200).json({ result });
    } catch (error) {
      console.log({ error });
      return { error };
    }
  }

  @Post()
  async create(@Res() res: Response, @Body() data: CreateTelegramAccountDto) {
    // Creating Telegram Account
    const telegramAccount = await this.telegramAccountService.create(data);
    if (!telegramAccount)
      return res.status(400).json({ error: `Telegram Account Not Created!` });

    // Creating Wallet
    const wallet = await this.walletService.create({});
    if (!wallet) return res.status(400).json({ error: 'Wallet Not Created!' });

    // Creating Account
    const account = await this.accountService.create({
      walletId: wallet.id,
      telegramAccountId: telegramAccount.id,
    });
    if (!account)
      return res.status(400).json({ error: 'Account Not Created!' });

    return res.status(201).json({ result: telegramAccount });
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
    @Body() updateDto: UpdateTelegramAccountDto,
  ) {
    const { id } = params.id;

    // Checking Account
    const existedAccount = await this.telegramAccountService.findOne({
      where: { id },
    });
    if (!existedAccount)
      return res
        .status(400)
        .json({ error: `Telegram Account #${id} Not Found!` });

    // Updating Account
    const result = await this.telegramAccountService.update({
      where: { id },
      data: updateDto,
    });

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

    // Checking Account
    const existedAccount = await this.telegramAccountService.findOne({
      where: { id },
    });
    if (!existedAccount)
      return res
        .status(404)
        .json({ error: `Telegram Account #${id} Not Found!` });

    // Deleting Account
    const result = await this.telegramAccountService.delete({ where: { id } });

    return res.status(200).json({ result });
  }
}
