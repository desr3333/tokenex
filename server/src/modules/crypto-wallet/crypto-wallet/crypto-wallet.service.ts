import { Injectable } from '@nestjs/common';
import { CryptoWallet, Prisma } from '@prisma/client';

import { PrismaService } from '@modules/prisma';

@Injectable()
export class CryptoWalletService {
  constructor(private prisma: PrismaService) {}

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
}
