import { Module } from '@nestjs/common';

import { CryptoWalletController } from './crypto-wallet.controller';
import { CryptoWalletService } from './crypto-wallet.service';

import { BTCModule } from '@modules/token/btc';
import { ETHModule } from '@modules/token/eth';
import { USDTModule } from '@modules/token/usdt';

@Module({
  imports: [ETHModule, BTCModule, USDTModule],
  controllers: [CryptoWalletController],
  providers: [CryptoWalletService],
  exports: [CryptoWalletService],
})
export class CryptoWalletModule {}
