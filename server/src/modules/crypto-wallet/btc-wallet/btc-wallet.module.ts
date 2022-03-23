import { Module } from '@nestjs/common';

import { BTCWalletController } from './btc-wallet.controller';
import { BTCWalletService } from './btc-wallet.service';

@Module({
  imports: [],
  controllers: [BTCWalletController],
  providers: [BTCWalletService],
})
export class BTCWalletModule {}
