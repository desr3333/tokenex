import { Module } from '@nestjs/common';

import { PrismaService } from './../prisma';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';

@Module({
  imports: [],
  controllers: [WalletController],
  providers: [PrismaService, WalletService],
})
export class WalletModule {}
