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

import {
  CreateTelegramAccountDto,
  QueryTelegramAccountDto,
  UpdateTelegramAccountDto,
} from './telegram-account.dto';
import { TelegramAccountService } from './telegram-account.service';
import { AccountService } from '../account';

@ApiTags('TelegramAccount')
@Controller('/telegram-accounts')
export class TelegramAccountController {
  constructor(
    private telegramService: TelegramAccountService,
    private accountService: AccountService,
  ) {}

  @Post('/query')
  async query(@Body() queryDto: QueryTelegramAccountDto) {
    const { where } = queryDto;

    const result = await this.telegramService.query({ where });
    return { result };
  }

  @Get()
  async getAll(): Promise<any> {
    const result = await this.telegramService.query({});
    return { result };
  }

  @Get('@:chatId')
  @ApiParam({
    name: 'id',
    required: true,
    type: 'integer',
  })
  async getByChatId(@Param() params): Promise<any> {
    try {
      const chatId = Number(params.chatId);
      if (!chatId) throw Error('Invalid Chat Id!');

      const result = await this.telegramService.findOne({ chatId });
      if (!result) throw Error(`Telegram Account #${chatId} Not Found!`);

      return { result };
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
  async getByKey(@Param() params): Promise<any> {
    const id = params.id;

    const result = await this.telegramService.findOne({ id });
    if (!result) return { error: `Telegram Account #${id} Not Found!` };

    return { result };
  }

  @Post()
  async create(@Body() createDto: CreateTelegramAccountDto): Promise<any> {
    const { chatId } = createDto;

    console.log('Creating Telegram Account [..]');
    console.log({ createDto });

    return;

    // Checking Telegram Account
    const existedTelegramAccount = await this.telegramService.findOne({
      chatId,
    });
    if (existedTelegramAccount)
      return {
        error: `Telegram Account Already Exists!`,
      };

    // Creating Account
    const createdAccount = await this.accountService.create({
      telegramAccountId: 1,
    });
    if (!createdAccount)
      return {
        error: `Account Not Created!`,
      };

    // Creating Telegram Account
    const result = await this.telegramService.create(createDto);
    if (!result) return { error: `Telegram Account Not Created!` };

    // Updating Account
    const updatedAccount = await this.accountService.update(
      { id: createdAccount.id },
      { telegramAccountId: result.id },
    );
    if (!updatedAccount)
      return {
        error: `Account Not Updated!`,
      };

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
    @Body() updateDto: UpdateTelegramAccountDto,
  ): Promise<any> {
    const id = Number(params.id);

    // Checking Account
    const existedAccount = await this.telegramService.findOne({ id });
    if (!existedAccount) return { error: `Telegram Account #${id} Not Found!` };

    // Updating Account
    const result = await this.telegramService.update({ id }, updateDto);
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

    // Checking Account
    const existedAccount = await this.telegramService.findOne({ id });
    if (!existedAccount) return { error: `Telegram Account #${id} Not Found!` };

    // Deleting Account
    const result = await this.telegramService.delete({ id });
    return { result };
  }
}
