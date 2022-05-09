import { Module } from '@nestjs/common';

import { CryptoWalletModule } from '@modules/crypto-wallet';
import { NotificationModule } from '@modules/notification';

import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

@Module({
  imports: [],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
