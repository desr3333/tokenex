import { Module } from '@nestjs/common';

import { CryptoWalletModule } from '@modules/crypto-wallet';

import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';

@Module({
  imports: [CryptoWalletModule],
  controllers: [WalletController],
  providers: [WalletService],
  exports: [WalletService],
})
export class WalletModule {}
