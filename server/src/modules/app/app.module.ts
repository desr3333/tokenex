import { forwardRef, Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { AccountModule } from './../account';
import { WalletModule } from './../wallet';
import { AuthModule } from './../auth';
import { TelegramAccountModule } from './../telegram-account';

// import {
//   CryptoWalletModule,
//   BTCWalletModule,
//   ETHWalletModule,
//   USDTWalletModule,
// } from './../crypto-wallet';

@Module({
  imports: [
    PrismaModule,
    AccountModule,
    // TelegramAccountModule,
    // WalletModule,
    // CryptoWalletModule,
    // ETHWalletModule,
    // USDTWalletModule,
  ],
})
export class AppModule {}
