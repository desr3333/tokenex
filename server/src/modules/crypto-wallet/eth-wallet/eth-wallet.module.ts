import { Module } from '@nestjs/common';

import { CryptoWalletModule } from './../crypto-wallet';
import { ETHService } from './../../token';

import { ETHWalletController } from './eth-wallet.controller';
import { ETHWalletService } from './eth-wallet.service';

@Module({
  imports: [CryptoWalletModule],
  controllers: [ETHWalletController],
  providers: [ETHWalletService, ETHService],
  exports: [ETHWalletService],
})
export class ETHWalletModule {}
