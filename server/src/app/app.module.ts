import { Module } from '@nestjs/common';

import { AccountModule, TelegramAccountModule } from './../account';
import { WalletModule } from './../wallet';
import { AuthModule } from './../auth';

@Module({
  imports: [
    AuthModule,
    AccountModule,
    TelegramAccountModule,
    WalletModule,
    // ..
  ],
})
export class AppModule {}
