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

@ApiTags('TelegramAccount')
@Controller('/telegram-accounts')
export class TelegramAccountController {
  constructor(
    private telegramAccountService: TelegramAccountService,
    private accountService: AccountService,
  ) {}

  @Post('/query')
  async query(@Res() res: Response, @Body() queryDto: QueryTelegramAccountDto) {
    const { where } = queryDto;

    const result = await this.telegramAccountService.query({ where });
    return res.status(200).json({ result });
  }

  @Get()
  async getAll(@Res() res: Response): Promise<any> {
    const result = await this.telegramAccountService.query({});
    return res.status(200).json({ result });
  }

  @Get('@:chatId')
  @ApiParam({
    name: 'id',
    required: true,
    type: 'integer',
  })
  async getByChatId(@Res() res: Response, @Param() params): Promise<any> {
    try {
      const chatId = Number(params.chatId);
      if (!chatId) throw Error('Invalid Chat Id!');

      console.log({ chatId });

      const result = await this.telegramAccountService.findOne({ chatId });
      if (!result)
        return res
          .status(404)
          .json({ error: `Telegram Account #${chatId} Not Found!` });

      return res.status(200).json({ result });
    } catch (error) {
      console.log({ error });
      return { error };
    }
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: 'integer',
  })
  async getByKey(@Res() res: Response, @Param() params): Promise<any> {
    const id = Number(params.id);

    const result = await this.telegramAccountService.findOne({ id });
    if (!result)
      return res
        .status(400)
        .json({ error: `Telegram Account #${id} Not Found!` });

    return res.status(200).json({ result });
  }

  @Post()
  async create(
    @Res() res: Response,
    @Body() createDto: CreateTelegramAccountDto,
  ): Promise<any> {
    const { chatId } = createDto;

    // // Checking Telegram Account
    // const existedTelegramAccount = await this.telegramAccountService.findOne({
    //   chatId,
    // });
    // if (existedTelegramAccount)
    //   return res
    //     .status(400)
    //     .json({ error: `Telegram Account Already Exists!` });

    // Creating Telegram Account
    const createdTelegramAccount = await this.telegramAccountService.create(
      createDto,
    );
    if (!createdTelegramAccount)
      return res.status(400).json({ error: `Telegram Account Not Created!` });

    // Creating Account
    const createdAccount = await this.accountService.create({
      telegramAccountId: createdTelegramAccount.id,
      telegramAccountChatId: createdTelegramAccount.chatId,
    });
    if (!createdAccount)
      return res.status(400).json({ error: 'Account Not Created!' });

    // Updating Telegram Account
    const result = await this.telegramAccountService.findOne({ chatId });
    if (!result)
      return res.status(400).json({ error: `Telegram Account Not Created!` });

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
    @Body() updateDto: UpdateTelegramAccountDto,
  ): Promise<any> {
    const id = Number(params.id);

    // Checking Account
    const existedAccount = await this.telegramAccountService.findOne({ id });
    if (!existedAccount)
      return res
        .status(400)
        .json({ error: `Telegram Account #${id} Not Found!` });

    // Updating Account
    const result = await this.telegramAccountService.update({ id }, updateDto);

    return res.status(200).json({ result });
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: 'integer',
  })
  async delete(@Res() res: Response, @Param() params): Promise<any> {
    const id = Number(params.id);

    // Checking Account
    const existedAccount = await this.telegramAccountService.findOne({ id });
    if (!existedAccount)
      return res
        .status(404)
        .json({ error: `Telegram Account #${id} Not Found!` });

    // Deleting Account
    const result = await this.telegramAccountService.delete({ id });

    return res.status(200).json({ result });
  }
}
