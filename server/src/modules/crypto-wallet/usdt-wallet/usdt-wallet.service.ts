import { Injectable } from '@nestjs/common';
import { CryptoWallet, Prisma } from '@prisma/client';

import { PrismaService } from '@modules/prisma';
import { CryptoWalletServiceBuilder } from '../crypto-wallet';
import { USDTService } from './../../token';
import { CreateUSDTWalletDto } from './usdt-wallet.dto';

@Injectable()
export class USDTWalletService implements CryptoWalletServiceBuilder {
  public symbol: string;

  constructor(private prisma: PrismaService, private USDTService: USDTService) {
    this.symbol = 'USDT';
  }

  async create(createDto: CreateUSDTWalletDto): Promise<CryptoWallet> {
    try {
      const { symbol } = this;

      // Generating Address
      const account = await this.USDTService.create();
      if (!account) throw Error(`${symbol} Account Not Generated!`);

      // Processing Data
      const { address, privateKey } = account;
      const data = {
        ...createDto,
        address,
        symbol,
      };

      // Creating Crypto Wallet
      const createdWallet = await this.prisma.cryptoWallet.create({ data });
      if (!createdWallet) throw Error(`${symbol} Crypto Wallet Not Created!`);

      return createdWallet;
    } catch (e) {
      console.log({ e });
      return null;
    }
  }
}
