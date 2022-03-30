import { Module } from '@nestjs/common';

import { CryptoWalletModule } from '@modules/crypto-wallet/crypto-wallet';
import { BTCService } from '@modules/token/btc';

import { BTCWalletController } from './btc-wallet.controller';
import { BTCWalletService } from './btc-wallet.service';

@Module({
  imports: [CryptoWalletModule],
  controllers: [BTCWalletController],
  providers: [BTCWalletService, BTCService],
  exports: [BTCWalletService],
})
export class BTCWalletModule {}
