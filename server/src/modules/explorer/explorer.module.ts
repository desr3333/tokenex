import { Module } from '@nestjs/common';

import { NotificationModule } from '@modules/notification';

import { BitcoinExplorerModule } from './bitcoin';
import { EthereumExplorerModule } from './ethereum';

import { ExplorerController } from './explorer.controller';
import { ExplorerService } from './explorer.service';

@Module({
  imports: [NotificationModule, EthereumExplorerModule, BitcoinExplorerModule],
  controllers: [ExplorerController],
  providers: [ExplorerService],
  exports: [ExplorerService],
})
export class ExplorerModule {}
