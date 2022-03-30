import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { TelegramAuthRequestDto } from './auth.dto';
import { RoleGuard } from './auth.guard';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@UseGuards(RoleGuard)
@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async authenticate(@Body() telegramAuthRequestDto: TelegramAuthRequestDto) {
    const result = await this.authService.authenticate(telegramAuthRequestDto);

    if (!result) return { error: `You Can't Access This Telegram Account` };

    return { result };
  }
}
