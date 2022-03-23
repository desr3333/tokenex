import { Module } from '@nestjs/common';

import { AccountModule } from '@modules/account';
import { TelegramAccountController } from './telegram-account.controller';
import { TelegramAccountService } from './telegram-account.service';

@Module({
  imports: [AccountModule],
  controllers: [TelegramAccountController],
  providers: [TelegramAccountService],
  exports: [TelegramAccountService],
})
export class TelegramAccountModule {}
