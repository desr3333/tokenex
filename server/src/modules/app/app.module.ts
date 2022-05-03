import { Module } from '@nestjs/common';

import { PrismaModule } from '@modules/prisma/prisma.module';
import { AuthModule } from '@modules/auth/auth.module';
import { AccountModule } from '@modules/account';
import { WalletModule } from '@modules/wallet';
import { TelegramAccountModule } from '@modules/telegram-account';
import { CryptoWalletModule } from '@modules/crypto-wallet';
import { TokenModule } from '@modules/crypto-token';
import { CoinmarketModule } from '@modules/coin-market';
import { ExplorerModule } from '@modules/explorer';
import { TelegramModule } from '@modules/telegram';
import { NotificationModule } from '@modules/notification';
import { CoinbaseModule } from '@modules/coinbase';
import { ExchangeModule } from '@modules/exchange';

import { AppController } from './app.controller';

@Module({
  imports: [
    // Global
    PrismaModule,
    AuthModule,

    // Modules
    AccountModule,
    TelegramAccountModule,
    WalletModule,
    TokenModule,
    CryptoWalletModule,
    NotificationModule,
    ExchangeModule,

    ExplorerModule,
    TelegramModule,
    CoinbaseModule,
    CoinmarketModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
