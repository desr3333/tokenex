import { Injectable } from '@nestjs/common';
import { Prisma, Account } from '@prisma/client';
import { WalletService } from '../wallet/wallet.service';

import { PrismaService } from './../prisma/prisma.service';

@Injectable()
export class AccountService {
  constructor(
    private prisma: PrismaService,
    private walletService: WalletService,
  ) {}

  async query(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AccountWhereUniqueInput;
    where?: Prisma.AccountWhereInput;
    orderBy?: Prisma.AccountOrderByWithRelationInput;
  }): Promise<Account[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return this.prisma.account.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(where?: Prisma.AccountWhereUniqueInput): Promise<Account> {
    return this.prisma.account.findUnique({
      where,
      include: { wallet: true, telegramAccount: true },
    });
  }

  async create(data: Prisma.AccountUncheckedCreateInput): Promise<Account> {
    try {
      // Creating Wallet + Crypto Wallets
      const wallet = await this.walletService.initiate();
      if (!wallet) throw Error('Wallet Not Created!');

      // Creating Account
      const account = this.prisma.account.create({
        data: { ...data, walletId: wallet.id },
      });
      if (!account) throw Error('Account Not Created!');

      return account;
    } catch (e) {
      console.log({ e });
      return null;
    }
  }

  async update(
    where: Prisma.AccountWhereUniqueInput,
    data: Prisma.AccountUncheckedUpdateInput,
  ): Promise<Account> {
    return this.prisma.account.update({
      data,
      where,
    });
  }
  async delete(where: Prisma.AccountWhereUniqueInput): Promise<Account> {
    return this.prisma.account.delete({
      where,
    });
  }
}
