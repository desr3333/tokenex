import { Module } from '@nestjs/common';

import { WalletModule } from '@modules/wallet';

import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
  imports: [WalletModule],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
