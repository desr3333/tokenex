import { Module } from '@nestjs/common';

import { USDTService } from './../../token';
import { WalletModule, WalletService } from './../../wallet';

import { USDTWalletController } from './usdt-wallet.controller';
import { USDTWalletService } from './usdt-wallet.service';

@Module({
  imports: [],
  controllers: [USDTWalletController],
  providers: [USDTWalletService, USDTService],
})
export class USDTWalletModule {}
