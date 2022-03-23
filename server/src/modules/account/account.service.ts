import { Injectable } from '@nestjs/common';
import { Prisma, Account } from '@prisma/client';

import { PrismaService } from './../prisma/prisma.service';

@Injectable()
export class AccountService {
  constructor(private prisma: PrismaService) {}

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
      return this.prisma.account.create({
        data,
      });
    } catch (e) {
      console.log({ e });
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
