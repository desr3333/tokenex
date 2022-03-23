import { Injectable } from '@nestjs/common';
import { Prisma, Wallet } from '@prisma/client';

import { PrismaService } from './../prisma/prisma.service';

@Injectable()
export class WalletService {
  constructor(private prisma: PrismaService) {}

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
