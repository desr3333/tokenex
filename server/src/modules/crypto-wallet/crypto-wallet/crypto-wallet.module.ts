import { Module } from '@nestjs/common';

import { CryptoWalletController } from './crypto-wallet.controller';
import { CryptoWalletService } from './crypto-wallet.service';

import { ETHWalletModule } from './../eth-wallet/eth-wallet.module';
import { USDTWalletModule } from './../usdt-wallet';

@Module({
  imports: [],
  controllers: [CryptoWalletController],
  providers: [CryptoWalletService],
  exports: [CryptoWalletService],
})
export class CryptoWalletModule {}
