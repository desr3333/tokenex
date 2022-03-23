import { Injectable } from '@nestjs/common';
import { Prisma, TelegramAccount } from '@prisma/client';

import { PrismaService } from './../prisma/prisma.service';

@Injectable()
export class TelegramAccountService {
  constructor(private prisma: PrismaService) {}

  async query(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TelegramAccountWhereUniqueInput;
    where?: Prisma.TelegramAccountWhereInput;
    orderBy?: Prisma.TelegramAccountOrderByWithRelationInput;
  }): Promise<TelegramAccount[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return this.prisma.telegramAccount.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(
    where?: Prisma.TelegramAccountWhereUniqueInput,
  ): Promise<TelegramAccount> {
    return this.prisma.telegramAccount.findFirst({
      where,
      include: { account: true },
    });
  }

  async create(
    data: Prisma.TelegramAccountUncheckedCreateInput,
  ): Promise<TelegramAccount> {
    return this.prisma.telegramAccount.create({
      data,
    });
  }

  async update(
    where: Prisma.TelegramAccountWhereUniqueInput,
    data: Prisma.TelegramAccountUpdateInput,
  ): Promise<TelegramAccount> {
    return this.prisma.telegramAccount.update({
      data,
      where,
    });
  }
  async delete(
    where: Prisma.TelegramAccountWhereUniqueInput,
  ): Promise<TelegramAccount> {
    return this.prisma.telegramAccount.delete({
      where,
    });
  }
}
