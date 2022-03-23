import { Module } from '@nestjs/common';

import { TelegramAccountModule } from './../telegram-account';

import { AuthController, TelegramAuthController } from './auth.controller';
import { AuthService, TelegramAuthService } from './auth.service';

@Module({
  controllers: [AuthController, TelegramAuthController],
  providers: [AuthService, TelegramAuthService],
  exports: [AuthService, TelegramAuthService],
})
export class AuthModule {}
