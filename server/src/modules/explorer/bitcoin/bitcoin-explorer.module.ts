import { Module } from '@nestjs/common';

import { BTCModule } from '@modules/blockchain/bitcoin';
import { NotificationModule } from '@modules/notification';

import { BitcoinExplorerService } from './bitcoin-explorer.service';

@Module({
  imports: [BTCModule, NotificationModule],
  controllers: [],
  providers: [BitcoinExplorerService],
  exports: [BitcoinExplorerService],
})
export class BitcoinExplorerModule {}
