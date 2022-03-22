import { Module } from '@nestjs/common';

import { PrismaService } from './../prisma';

import { AccountService } from './../account/account.service';
import { TelegramAccountController } from './telegram-account.controller';
import { TelegramAccountService } from './telegram-account.service';

@Module({
  imports: [],
  controllers: [TelegramAccountController],
  providers: [PrismaService, TelegramAccountService, AccountService],
})
export class TelegramAccountModule {}
