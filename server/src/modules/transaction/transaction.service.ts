import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@modules/prisma';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async find(params: Prisma.TransactionFindManyArgs) {
    try {
      const result = await this.prisma.transaction.findMany(params);
      return result;
    } catch (e) {
      console.log({ e });
    }
  }

  async findOne(params: Prisma.TransactionFindUniqueArgs) {
    try {
      const result = await this.prisma.transaction.findUnique(params);
      return result;
    } catch (e) {
      console.log({ e });
    }
  }

  async create(data: Prisma.TransactionCreateInput) {
    try {
      const result = await this.prisma.transaction.create({ data });
      return result;
    } catch (e) {
      console.log({ e });
      return null;
    }
  }

  async update(params: Prisma.TransactionUpdateArgs) {
    const result = await this.prisma.transaction.update(params);
    return result;
  }

  async delete(params: Prisma.TransactionDeleteArgs) {
    const result = await this.prisma.transaction.delete(params);
    return result;
  }
}
