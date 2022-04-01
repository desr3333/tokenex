import { Injectable } from '@nestjs/common';
import { CryptoWallet, Prisma } from '@prisma/client';

import { Token } from '@types';
import { PrismaService } from '@modules/prisma';
import {
  CreateCryptoWalletDto,
  CryptoWalletKeyPair,
} from './crypto-wallet.dto';

import { ETHService } from '@modules/token/eth';
import { USDTService } from '@modules/token/usdt';
import { BTCService } from '@modules/token/btc';

@Injectable()
export class CryptoWalletService {
  constructor(
    private prisma: PrismaService,
    private BTCService: BTCService,
    private ETHService: ETHService,
    private USDTService: USDTService,
  ) {}

  async getAll() {
    try {
      const result = this.prisma.cryptoWallet.findMany();
      return result;
    } catch (e) {
      console.log({ e });
      return [];
    }
  }

  async query() {
    return [];
  }

  async findOne(where?: Prisma.CryptoWalletWhereInput): Promise<CryptoWallet> {
    try {
      const result = await this.prisma.cryptoWallet.findFirst({
        where,
        include: { token: true },
      });

      return result;
    } catch (e) {
      console.log({ e });
    }
  }

  async create(createDto: CreateCryptoWalletDto) {
    try {
      const symbol = createDto.symbol?.toUpperCase();

      let keyPair: CryptoWalletKeyPair;

      switch (symbol) {
        case Token.BTC:
          keyPair = await this.BTCService.create();
          break;
        case Token.ETH:
          keyPair = await this.ETHService.create();
          break;
        case Token.USDT:
          keyPair = await this.USDTService.create();
          break;
        default:
          throw Error('Incorrect Symbol!');
      }

      const data = {
        ...createDto,
        ...keyPair,
      };

      const result = await this.prisma.cryptoWallet.create({ data });
      if (!result) throw Error(`${symbol} Crypto Wallet Not Created!`);

      return result;
    } catch (e) {
      console.log({ e });
      return null;
    }
  }

  async update(
    where: Prisma.CryptoWalletWhereUniqueInput,
    data: Prisma.CryptoWalletUpdateInput,
  ): Promise<CryptoWallet> {
    try {
      const result = await this.prisma.cryptoWallet.update({
        data,
        where,
      });
      return result;
    } catch (e) {
      console.log({ e });
      return null;
    }
  }

  async delete(
    where: Prisma.CryptoWalletWhereUniqueInput,
  ): Promise<CryptoWallet> {
    try {
      const result = await this.prisma.cryptoWallet.delete({
        where,
      });
      return result;
    } catch (e) {
      console.log({ e });
      return null;
    }
  }

  async deposit() {
    return;
  }

  async withdraw() {
    return;
  }
}
