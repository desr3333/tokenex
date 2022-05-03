import { Module } from '@nestjs/common';

import { ETHModule } from '@modules/blockchain/ethereum';
import { NotificationModule } from '@modules/notification';

import { EthereumExplorerService } from './ethereum-explorer.service';

@Module({
  imports: [ETHModule, NotificationModule],
  controllers: [],
  providers: [EthereumExplorerService],
  exports: [EthereumExplorerService],
})
export class EthereumExplorerModule {}
