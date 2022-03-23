import { forwardRef, Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';

import { AccountModule } from './../account';
import { AuthModule } from '../../auth';

import { WalletModule } from './../wallet/wallet.module';
import { TelegramAccountModule } from './../telegram-account/telegram-account.module';

import { ETHWalletModule } from './../crypto-wallet/eth-wallet';
import { USDTWalletModule } from './../crypto-wallet/usdt-wallet';
import { BTCWalletModule } from './../crypto-wallet/btc-wallet';
import { CryptoWalletModule } from './../crypto-wallet/crypto-wallet';

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
