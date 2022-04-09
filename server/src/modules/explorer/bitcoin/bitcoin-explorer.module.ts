import { Module } from '@nestjs/common';

import { BTCModule } from '@modules/blockchain/bitcoin';

import { BitcoinExplorerController } from './bitcoin-explorer.controller';
import { BitcoinExplorerService } from './bitcoin-explorer.service';

@Module({
  imports: [BTCModule],
  controllers: [BitcoinExplorerController],
  providers: [BitcoinExplorerService],
  exports: [BitcoinExplorerService],
})
export class BitcoinExplorerModule {}
