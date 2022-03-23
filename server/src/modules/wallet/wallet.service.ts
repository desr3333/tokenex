import { Injectable } from '@nestjs/common';
import { Prisma, Wallet } from '@prisma/client';

import { PrismaService } from './../prisma/prisma.service';
import { ETHWalletService } from '../crypto-wallet/eth-wallet';
import { USDTWalletService } from '../crypto-wallet/usdt-wallet';

@Injectable()
export class WalletService {
  constructor(
    private prisma: PrismaService,
    private ETHWalletService: ETHWalletService,
    private USDTWalletService: USDTWalletService,
  ) {}

  async query(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.WalletWhereUniqueInput;
    where?: Prisma.WalletWhereInput;
    orderBy?: Prisma.WalletOrderByWithRelationInput;
  }): Promise<Wallet[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return this.prisma.wallet.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      //  include: { cryptoWallets: true },
    });
  }

  async findOne(where?: Prisma.WalletWhereUniqueInput): Promise<Wallet> {
    try {
      return this.prisma.wallet.findUnique({
        where,
        include: { cryptoWallets: true },
      });
    } catch (e) {
      console.log({ e });
    }
  }

  async create(data?: Prisma.WalletUncheckedCreateInput): Promise<Wallet> {
    try {
      return this.prisma.wallet.create({ data: data || {} });
    } catch (e) {
      console.log({ e });
      return null;
    }
  }

  async initiate(data?: Prisma.WalletUncheckedCreateInput) {
    try {
      // Creating Wallet
      const wallet = await this.create(data);
      if (!wallet) throw Error('Wallet Not Created!');

      const walletId = wallet.id;

      // Creating Crypto Wallet
      const ETHWallet = await this.ETHWalletService.create({ walletId });
      const USDTWallet = await this.USDTWalletService.create({ walletId });

      // console.log({ ETHWallet, USDTWallet });

      return wallet;
    } catch (e) {
      console.log({ e });
      return null;
    }
  }

  async update(
    where: Prisma.WalletWhereUniqueInput,
    data: Prisma.WalletUpdateInput,
  ): Promise<Wallet> {
    return this.prisma.wallet.update({
      data,
      where,
    });
  }
  async delete(where: Prisma.WalletWhereUniqueInput): Promise<Wallet> {
    return this.prisma.wallet.delete({
      where,
    });
  }
}
