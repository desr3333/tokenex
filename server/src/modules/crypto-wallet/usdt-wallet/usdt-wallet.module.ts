import { Module } from '@nestjs/common';

import { CryptoWalletModule } from '@modules/crypto-wallet/crypto-wallet';
import { USDTService } from '@modules/token/usdt';

import { USDTWalletController } from './usdt-wallet.controller';
import { USDTWalletService } from './usdt-wallet.service';

@Module({
  imports: [CryptoWalletModule],
  controllers: [USDTWalletController],
  providers: [USDTWalletService, USDTService],
  exports: [USDTWalletService],
})
export class USDTWalletModule {}
