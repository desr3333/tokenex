import { Module } from '@nestjs/common';

import { ETHModule } from '@modules/blockchain/ethereum';

import { EthereumExplorerController } from './ethereum-explorer.controller';
import { EthereumExplorerService } from './ethereum-explorer.service';

@Module({
  imports: [ETHModule],
  controllers: [EthereumExplorerController],
  providers: [EthereumExplorerService],
  exports: [EthereumExplorerService],
})
export class EthereumExplorerModule {}
