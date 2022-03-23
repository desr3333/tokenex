import { Module } from '@nestjs/common';
// import {
//   CryptoWalletModule,
//   CryptoWalletService,
//   ETHWalletModule,
//   ETHWalletService,
//   USDTWalletModule,
//   USDTWalletService,
// } from '../crypto-wallet';

import { PrismaService } from './../prisma/prisma.service';

import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';

@Module({
  imports: [],
  controllers: [WalletController],
  providers: [WalletService],
  exports: [WalletService],
})
export class WalletModule {}
