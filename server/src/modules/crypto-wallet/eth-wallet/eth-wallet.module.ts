import { Module } from '@nestjs/common';

import { PrismaService } from './../../prisma/prisma.service';
import { ETHService } from './../../token';

import { ETHWalletController } from './eth-wallet.controller';
import { ETHWalletService } from './eth-wallet.service';

@Module({
  imports: [],
  controllers: [ETHWalletController],
  providers: [ETHWalletService, PrismaService, ETHService],
  exports: [ETHWalletService],
})
export class ETHWalletModule {}
