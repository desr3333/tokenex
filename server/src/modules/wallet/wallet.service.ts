import { Injectable } from '@nestjs/common';
import { Prisma, Wallet } from '@prisma/client';

import { PrismaService } from '@modules/prisma';
import { CryptoWalletService } from '@modules/crypto-wallet';

// import { ETHWalletService } from '../crypto-wallet/eth-wallet';
// import { BTCWalletService } from '../crypto-wallet/btc-wallet';
// import { USDTWalletService } from '../crypto-wallet/usdt-wallet';

@Injectable()
export class WalletService {
  constructor(
    private prisma: PrismaService,
    private cryptoWalletService: CryptoWalletService,
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

  async setup(data?: Prisma.WalletUncheckedCreateInput) {
    try {
      // Creating Wallet
      const wallet = await this.create(data);
      if (!wallet) throw Error('Wallet Not Created!');

      const walletId = wallet.id;

      // TODO: Creating Crypto Wallets
      // const BTCWallet = await this.BTCWalletService.create({ walletId });
      // const ETHWallet = await this.ETHWalletService.create({ walletId });
      // const USDTWallet = await this.USDTWalletService.create({ walletId });

      // console.log({ BTCWallet, ETHWallet, USDTWallet });

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
}
