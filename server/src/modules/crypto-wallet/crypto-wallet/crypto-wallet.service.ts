import { Injectable } from '@nestjs/common';

import { PrismaService } from './../../prisma/prisma.service';

import { ETHWalletService } from './../eth-wallet';
import { USDTWalletService } from './../usdt-wallet';

// CryptoWallet Service
@Injectable()
export class CryptoWalletService {
  constructor(private prisma: PrismaService) {}
}

// CryptoWallet Builder
interface CryptoWalletServiceBuilderOptions {
  symbol: string;
}

export class CryptoWalletServiceBuilder {
  public symbol: string;

  constructor(options: CryptoWalletServiceBuilderOptions) {
    this.symbol = options?.symbol;
  }
}
