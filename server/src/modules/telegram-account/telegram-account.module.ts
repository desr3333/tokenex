import { Module } from '@nestjs/common';

import { AccountModule } from '@modules/account';
import { TelegramAccountController } from './telegram-account.controller';
import { TelegramAccountService } from './telegram-account.service';
import { WalletModule } from '@modules/wallet';

@Module({
  imports: [AccountModule, WalletModule],
  controllers: [TelegramAccountController],
  providers: [TelegramAccountService],
  exports: [TelegramAccountService],
})
export class TelegramAccountModule {}
