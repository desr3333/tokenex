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

  async find(params: Prisma.WalletFindManyArgs): Promise<Wallet[]> {
    try {
      return this.prisma.wallet.findMany(params);
    } catch (e) {
      console.log({ e });
      return [];
    }
  }

  async findOne(params?: Prisma.WalletFindUniqueArgs) {
    try {
      const wallet = await this.prisma.wallet.findUnique({
        ...params,
        include: {
          account: true,
          cryptoWallets: true,
        },
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

  async create(data: Prisma.WalletCreateInput): Promise<Wallet> {
    try {
      // Creating Wallet
      const wallet = await this.prisma.wallet.create({
        data: {
          ...data,
          createdAt: new Date(),
        },
      });
      if (!wallet) throw Error('Wallet Not Created!');

      const walletId = wallet.id;

      // Crypto Wallets
      this.cryptoWalletService.create({ symbol: Token.BTC, walletId });
      this.cryptoWalletService.create({ symbol: Token.ETH, walletId });

      return wallet;
    } catch (e) {
      console.log({ e });
      return null;
    }
  }

  async update(params: Prisma.WalletUpdateArgs): Promise<Wallet> {
    try {
      return this.prisma.wallet.update(params);
    } catch (e) {
      console.log({ e });
      return null;
    }
  }

  async delete(params: Prisma.WalletDeleteArgs): Promise<Wallet> {
    try {
      return this.prisma.wallet.delete(params);
    } catch (e) {
      console.log({ e });
      return null;
    }
  }

  async transfer(data: CryptoWalletTransferDto) {
    try {
      return this.cryptoWalletService.transfer(data);
    } catch (e) {
      console.log({ e });
      return null;
    }
  }
}
