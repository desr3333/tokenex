import { Injectable } from '@nestjs/common';
import { Prisma, Account } from '@prisma/client';

import { PrismaService } from '@modules/prisma';
import { WalletService } from '@modules/wallet';

@Injectable()
export class AccountService {
  constructor(
    private prisma: PrismaService,
    private walletService: WalletService,
  ) {}

  async find(params: Prisma.AccountFindManyArgs): Promise<Account[]> {
    try {
      return this.prisma.account.findMany(params);
    } catch (e) {
      console.log({ e });
      return [];
    }
  }

  async findOne(params: Prisma.AccountFindUniqueArgs): Promise<Account> {
    try {
      return this.prisma.account.findUnique(params);
    } catch (e) {
      console.log({ e });
      return null;
    }
  }

  async create(data: Prisma.AccountUncheckedCreateInput): Promise<Account> {
    try {
      const result = this.prisma.account.create({ data });
      if (!result) throw Error('Account Not Created!');

      return result;
    } catch (e) {
      console.log({ e });
      return null;
    }
  }

  async update(params: Prisma.AccountUpdateArgs): Promise<Account> {
    try {
      const result = await this.prisma.account.update(params);
      if (!result) throw Error(`Account Not Updated!`);
      return result;
    } catch (e) {
      console.log({ e });
      return null;
    }
  }

  async delete(params: Prisma.AccountDeleteArgs): Promise<Account> {
    try {
      const result = await this.prisma.account.delete(params);
      if (!result) throw Error(`Account Not Removed!`);
    } catch (e) {
      console.log({ e });
      return null;
    }
  }
}
