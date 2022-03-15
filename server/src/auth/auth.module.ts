import { Module } from '@nestjs/common';

import { PrismaService } from './../prisma';
import { AccountService, TelegramAccountService } from './../account';

import { AuthController, TelegramAuthController } from './auth.controller';
import { AuthService, TelegramAuthService } from './auth.service';

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
