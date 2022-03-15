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
  UpdateTelegramAccountDto,
} from './telegram-account.dto';
import { TelegramAccountService } from './telegram-account.service';

@ApiTags('TelegramAccount')
@Controller('/telegram-accounts')
export class TelegramAccountController {
  constructor(private readonly telegramService: TelegramAccountService) {}

  @Get()
  async getAll(): Promise<any> {
    const result = await this.telegramService.query({});
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

    const result = await this.telegramService.findOne({ id });
    if (!result) return { error: `Telegram Account #${id} Not Found!` };

    return { result };
  }

  @Post()
  async create(@Body() createDto: CreateTelegramAccountDto): Promise<any> {
    const { chatId } = createDto;

    // Checking Account
    const existedAccount = await this.telegramService.findOne({ chatId });
    if (existedAccount)
      return {
        error: `Telegram Account With ChatId ${chatId} Already Exists!`,
      };

    // Creating Account
    const result = await this.telegramService.create(createDto);
    if (!result) return { error: `Telegram Account Not Created!` };

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
