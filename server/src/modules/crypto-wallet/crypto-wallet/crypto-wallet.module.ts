import { Module } from '@nestjs/common';

import { CryptoWalletController } from './crypto-wallet.controller';
import { CryptoWalletService } from './crypto-wallet.service';

import { ETHWalletModule, ETHWalletService } from '../eth-wallet';
import { USDTWalletModule, USDTWalletService } from '../usdt-wallet';
import { ETHService } from 'src/modules/token';

@Module({
  imports: [ETHWalletModule],
  controllers: [CryptoWalletController],
  providers: [
    CryptoWalletService,
    ETHWalletService,
    ETHService,
    // USDTWalletService,
  ],
})
export class CryptoWalletModule {}
