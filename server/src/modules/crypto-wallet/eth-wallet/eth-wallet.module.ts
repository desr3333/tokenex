import { Module } from '@nestjs/common';

import { CryptoWalletModule } from '@modules/crypto-wallet/crypto-wallet';
import { ETHService } from '@modules/token/eth';

import { ETHWalletController } from './eth-wallet.controller';
import { ETHWalletService } from './eth-wallet.service';

@Module({
  imports: [CryptoWalletModule],
  controllers: [ETHWalletController],
  providers: [ETHWalletService, ETHService],
  exports: [ETHWalletService],
})
export class ETHWalletModule {}
