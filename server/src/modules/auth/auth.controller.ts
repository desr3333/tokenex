import { Body, Controller, Param, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { TelegramAuthRequestDto } from './auth.dto';
import { TelegramAuthService } from './auth.service';

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {}

@ApiTags('Auth/Telegram')
@Controller('/auth/telegram')
export class TelegramAuthController {
  constructor(private telegramAuthService: TelegramAuthService) {}

  @Post()
  async authenticate(@Body() telegramAuthRequestDto: TelegramAuthRequestDto) {
    const result = await this.telegramAuthService.authenticate(
      telegramAuthRequestDto,
    );

    if (!result) return { error: `You Can't Access This Telegram Account` };

    return { result };
  }
}
