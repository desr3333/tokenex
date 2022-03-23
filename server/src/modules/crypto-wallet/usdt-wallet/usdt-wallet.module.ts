import { Module } from '@nestjs/common';

import { USDTService } from './../../token';

import { USDTWalletController } from './usdt-wallet.controller';
import { USDTWalletService } from './usdt-wallet.service';

@Module({
  imports: [],
  controllers: [USDTWalletController],
  providers: [USDTWalletService, USDTService],
  exports: [USDTWalletService],
})
export class USDTWalletModule {}
