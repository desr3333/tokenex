import { forwardRef, Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';

import { AccountModule } from './../account';
import { AuthModule } from '../../auth';

import { WalletModule } from './../wallet/wallet.module';
import { TelegramAccountModule } from './../telegram-account/telegram-account.module';

// import { CryptoWalletModule } from '../crypto-wallet';

@Module({
  imports: [
    // Global
    PrismaModule,
    AuthModule,

    // Modules
    AccountModule,
    TelegramAccountModule,
    WalletModule,
    // CryptoWalletModule,
    // ETHWalletModule,
    // USDTWalletModule,
  ],
})
export class AppModule {}
