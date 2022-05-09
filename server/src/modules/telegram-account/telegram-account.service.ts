import { Injectable } from '@nestjs/common';
import { Prisma, TelegramAccount } from '@prisma/client';

import { PrismaService } from '@modules/prisma';

@Injectable()
export class TelegramAccountService {
  constructor(private prisma: PrismaService) {}

  async find(
    params: Prisma.TelegramAccountFindManyArgs,
  ): Promise<TelegramAccount[]> {
    try {
      return this.prisma.telegramAccount.findMany(params);
    } catch (e) {
      console.log({ e });
      return [];
    }
  }

  async findOne(
    params: Prisma.TelegramAccountFindUniqueArgs,
  ): Promise<TelegramAccount> {
    try {
      const result = await this.prisma.telegramAccount.findUnique(params);
      return result;
    } catch (e) {
      console.log({ e });
      return null;
    }
  }

  async create(
    data: Prisma.TelegramAccountCreateInput,
  ): Promise<TelegramAccount> {
    try {
      const result = await this.prisma.telegramAccount.create({ data });
      return result;
    } catch (e) {
      console.log({ e });
      return null;
    }
  }

  async update(
    params: Prisma.TelegramAccountUpdateArgs,
  ): Promise<TelegramAccount> {
    try {
      return this.prisma.telegramAccount.update(params);
    } catch (e) {
      console.log({ e });
      return null;
    }
  }

  async delete(
    params: Prisma.TelegramAccountDeleteArgs,
  ): Promise<TelegramAccount> {
    try {
      return this.prisma.telegramAccount.delete(params);
    } catch (e) {
      console.log({ e });
      return null;
    }
  }
}
