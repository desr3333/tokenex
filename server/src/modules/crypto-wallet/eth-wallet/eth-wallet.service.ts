import { Injectable } from '@nestjs/common';
import { CryptoWallet } from '@prisma/client';

import { PrismaService } from './../../prisma/prisma.service';

import { CreateETHWalletDto } from './eth-wallet.dto';
import { ETHService } from './../../token';

import { CryptoWalletServiceBuilder } from '../crypto-wallet';

@Injectable()
export class ETHWalletService implements CryptoWalletServiceBuilder {
  public symbol: string;

  constructor(private prisma: PrismaService, private ETHService: ETHService) {
    this.symbol = 'ETH';
  }

  async create(createDto: CreateETHWalletDto): Promise<CryptoWallet> {
    try {
      const { symbol } = this;

      // Generating Address
      const account = await this.ETHService.create();
      if (!account) throw Error(`${symbol} Account Not Generated!`);

      // Processing Data
      const { address, privateKey } = account;
      const data = {
        ...createDto,
        address,
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
