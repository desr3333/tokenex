import { BTCModule, BitcoinService } from '@modules/blockchain/bitcoin';
import { ETHModule, EthereumService } from '@modules/blockchain/ethereum';
import { Module } from '@nestjs/common';

import {
  BTCExplorerController,
  EthereumExplorerController,
} from './explorer.controller';
import {
  BitcoinExplorerService,
  EthereumExplorerService,
  ExplorerService,
} from './explorer.service';

@Module({
  imports: [
    //..
    BTCModule,
    ETHModule,
  ],
  controllers: [
    //..
    BTCExplorerController,
    EthereumExplorerController,
  ],
  providers: [
    ExplorerService,
    BitcoinService,
    EthereumService,
    // ..
    BitcoinExplorerService,
    EthereumExplorerService,
  ],
  exports: [ExplorerService],
})
export class ExplorerModule {}
