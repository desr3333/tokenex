import { Injectable } from '@nestjs/common';
import { CryptoWallet } from '@prisma/client';

import { PrismaService } from '@modules/prisma';
import { BTCService } from './../../token';

import {
  CryptoWalletService,
  CryptoWalletServiceBuilder,
} from './../crypto-wallet';
import { CreateBTCWalletDto } from './btc-wallet.dto';

@Injectable()
export class BTCWalletService implements CryptoWalletServiceBuilder {
  public symbol: string;

  constructor(
    private prisma: PrismaService,
    // private cryptoWalletService: CryptoWalletService,
    private BTCService: BTCService,
  ) {
    this.symbol = 'BTC';
  }

  async create(createDto: CreateBTCWalletDto): Promise<CryptoWallet> {
    try {
      const { symbol } = this;

      // Creating BTC Account
      const account = await this.BTCService.create();
      if (!account) throw Error(`${symbol} Account Not Generated!`);

      const { address } = account;
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
