import { Module } from '@nestjs/common';

import { AccountModule } from './../account';
import { TelegramAccountController } from './telegram-account.controller';
import { TelegramAccountService } from './telegram-account.service';

@Module({
  imports: [AccountModule],
  exports: [TelegramAccountService],
  controllers: [TelegramAccountController],
  providers: [TelegramAccountService],
})
export class TelegramAccountModule {}
