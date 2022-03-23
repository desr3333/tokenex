import { Module } from '@nestjs/common';
import { BTCService } from 'src/modules/token';

import { CryptoWalletModule } from './../crypto-wallet';
import { BTCWalletController } from './btc-wallet.controller';
import { BTCWalletService } from './btc-wallet.service';

@Module({
  imports: [CryptoWalletModule],
  controllers: [BTCWalletController],
  providers: [BTCWalletService, BTCService],
  exports: [BTCWalletService],
})
export class BTCWalletModule {}
