import { Injectable } from '@nestjs/common';
import { Prisma, Wallet } from '@prisma/client';

import { PrismaService } from '@modules/prisma';
import {
  CryptoWalletService,
  CryptoWalletTransferDto,
} from '@modules/crypto-wallet';
import { Token } from '@types';
import { WalletWithdrawDto } from './wallet.dto';
import { NotificationService } from '@modules/notification';

@Injectable()
export class WalletService {
  constructor(
    private prisma: PrismaService,
    private cryptoWalletService: CryptoWalletService,
    private notificationService: NotificationService,
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
    });
  }

  async findOne(
    where?: Prisma.WalletWhereUniqueInput,
    include?: Prisma.WalletInclude,
  ) {
    try {
      // Fetching
      const wallet = await this.prisma.wallet.findUnique({
        where,
        include: { cryptoWallets: true, account: true },
      });

      // Refreshing Balances
      wallet?.cryptoWallets?.map(({ symbol, address }) => {
        this.cryptoWalletService.updateBalance({ symbol, address });
      });

      return wallet;
    } catch (e) {
      console.log({ e });
    }
  }

  async create(data?: Prisma.WalletUncheckedCreateInput): Promise<Wallet> {
    try {
      // Creating Wallet
      const wallet = await this.prisma.wallet.create({ data: data || {} });
      if (!wallet) throw Error('Wallet Not Created!');

      const walletId = wallet.id;

      // Creating Crypto Wallets
      this.cryptoWalletService.create({ symbol: Token.BTC, walletId });
      this.cryptoWalletService.create({ symbol: Token.ETH, walletId });
      // this.cryptoWalletService.create({ symbol: Token.USDT, walletId });

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

  async transfer(data: CryptoWalletTransferDto) {
    try {
      const result = await this.cryptoWalletService.transfer(data);
      return result;
    } catch (e) {
      console.log({ e });
    }
  }
}
