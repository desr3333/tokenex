import { Module } from '@nestjs/common';

import { CryptoWalletController } from './crypto-wallet.controller';
import { CryptoWalletService } from './crypto-wallet.service';

import { BTCModule } from '@modules/blockchain/bitcoin';
import { ETHModule } from '@modules/blockchain/ethereum';

@Module({
  imports: [ETHModule, BTCModule],
  controllers: [CryptoWalletController],
  providers: [CryptoWalletService],
  exports: [CryptoWalletService],
})
export class CryptoWalletModule {}
