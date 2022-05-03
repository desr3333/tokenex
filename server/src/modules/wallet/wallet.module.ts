import { Module } from '@nestjs/common';

import { CryptoWalletModule } from '@modules/crypto-wallet';
import { NotificationModule } from '@modules/notification';

import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';

@Module({
  imports: [NotificationModule, CryptoWalletModule],
  controllers: [WalletController],
  providers: [WalletService],
  exports: [WalletService],
})
export class WalletModule {}
