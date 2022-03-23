import { forwardRef, Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';

import { AuthModule } from '@modules/auth';
import { AccountModule } from '@modules/account';
import { WalletModule } from '@modules/wallet';
import { TelegramAccountModule } from '@modules/telegram-account';
import {
  CryptoWalletModule,
  BTCWalletModule,
  ETHWalletModule,
  USDTWalletModule,
} from '@modules/crypto-wallet';

@Module({
  imports: [
    // Global
    PrismaModule,
    AuthModule,

    // Modules
    AccountModule,
    TelegramAccountModule,
    WalletModule,
    CryptoWalletModule,
    ETHWalletModule,
    USDTWalletModule,
    BTCWalletModule,
  ],
})
export class AppModule {}
