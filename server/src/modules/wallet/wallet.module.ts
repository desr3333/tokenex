import { Module } from '@nestjs/common';

import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';

import { ETHWalletModule } from '../crypto-wallet/eth-wallet';
import { USDTWalletModule } from '../crypto-wallet/usdt-wallet';

@Module({
  imports: [ETHWalletModule, USDTWalletModule],
  controllers: [WalletController],
  providers: [WalletService],
  exports: [WalletService],
})
export class WalletModule {}
