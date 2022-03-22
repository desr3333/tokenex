import { Module } from '@nestjs/common';

import { AccountModule } from './../account';
import { WalletModule } from './../wallet';
import { AuthModule } from './../auth';
import { TelegramAccountModule } from './../telegram-account';

import { ETHModule, USDTModule } from './../token';

@Module({
  imports: [
    AuthModule,
    AccountModule,
    TelegramAccountModule,
    WalletModule,

    // ..
    ETHModule,
    USDTModule,
  ],
})
export class AppModule {}
