import { Injectable } from '@nestjs/common';
import { CryptoWallet, Prisma } from '@prisma/client';

import { PrismaService } from '@modules/prisma';
import { CreateCryptoWalletDto } from './crypto-wallet.dto';

@Injectable()
export class CryptoWalletService {
  constructor(private prisma: PrismaService) {}

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

  async create(data: Prisma.CryptoWalletUncheckedCreateInput) {
    try {
      const { symbol } = data;
      const result = await this.prisma.cryptoWallet.create({ data });
      if (!result) throw Error(`${symbol} Crypto Wallet Not Created!`);
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
}
