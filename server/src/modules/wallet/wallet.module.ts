import { Module } from '@nestjs/common';

import { CryptoWalletModule } from '@modules/crypto-wallet';
import { ETHWalletModule } from '@modules/crypto-wallet/eth-wallet';
import { USDTWalletModule } from '@modules/crypto-wallet/usdt-wallet';
import { BTCWalletModule } from '@modules/crypto-wallet/btc-wallet';

import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';

@Module({
  imports: [
    CryptoWalletModule,
    ETHWalletModule,
    USDTWalletModule,
    BTCWalletModule,
  ],
  controllers: [WalletController],
  providers: [WalletService],
  exports: [WalletService],
})
export class WalletModule {}
