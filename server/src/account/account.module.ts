import { Module } from '@nestjs/common';
import { WalletService } from 'src/wallet';

import { PrismaService } from './../prisma';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
  imports: [],
  controllers: [AccountController],
  providers: [PrismaService, AccountService, WalletService],
})
export class AccountModule {}
