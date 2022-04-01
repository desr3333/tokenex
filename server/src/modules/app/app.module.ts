import { Module } from '@nestjs/common';

import { PrismaModule } from '@modules/prisma/prisma.module';
import { AuthModule } from '@modules/auth/auth.module';

import { AccountModule } from '@modules/account';
import { WalletModule } from '@modules/wallet';
import { TelegramAccountModule } from '@modules/telegram-account';
import { CryptoWalletModule } from '@modules/crypto-wallet';

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
  ],
})
export class AppModule {}
