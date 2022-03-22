import { Module } from '@nestjs/common';

import { PrismaService } from './../prisma';

import { AuthController, TelegramAuthController } from './auth.controller';
import { AuthService, TelegramAuthService } from './auth.service';
import { TelegramAccountService } from './../telegram-account';

@Module({
  imports: [],
  controllers: [AuthController, TelegramAuthController],
  providers: [
    PrismaService,
    AuthService,
    TelegramAuthService,
    TelegramAccountService,
  ],
})
export class AuthModule {}
