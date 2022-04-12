import { BTCModule, BitcoinService } from '@modules/blockchain/bitcoin';
import { ETHModule, EthereumService } from '@modules/blockchain/ethereum';
import { Module } from '@nestjs/common';

import { BitcoinExplorerController, BitcoinExplorerService } from './bitcoin';
import {
  EthereumExplorerController,
  EthereumExplorerService,
} from './ethereum';

@Module({
  imports: [BTCModule, ETHModule],
  controllers: [BitcoinExplorerController, EthereumExplorerController],
  providers: [BitcoinExplorerService, EthereumExplorerService],
  exports: [],
})
export class ExplorerModule {}
