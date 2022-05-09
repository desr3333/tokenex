import { Module } from '@nestjs/common';

import { CryptoWalletController } from './crypto-wallet.controller';
import { CryptoWalletService } from './crypto-wallet.service';

import { BTCModule } from '@modules/blockchain/bitcoin';
import { ETHModule } from '@modules/blockchain/ethereum';
import { NotificationModule } from '@modules/notification';
import { TransactionModule } from '@modules/transaction';

@Module({
  imports: [TransactionModule, NotificationModule, ETHModule, BTCModule],
  controllers: [CryptoWalletController],
  providers: [CryptoWalletService],
  exports: [CryptoWalletService],
})
export class CryptoWalletModule {}
