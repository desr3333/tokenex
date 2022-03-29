import { Injectable } from '@nestjs/common';
import { CryptoWallet } from '@prisma/client';

import { PrismaService } from '@modules/prisma';
import { ETHService } from '@modules/token';
import { CryptoWalletServiceBuilder } from '@modules/crypto-wallet';

import { CreateETHWalletDto } from './eth-wallet.dto';

@Injectable()
export class ETHWalletService implements CryptoWalletServiceBuilder {
  public symbol: string;

  constructor(private prisma: PrismaService, private ETHService: ETHService) {
    this.symbol = 'ETH';
  }

  async findOneByAddress(address: string) {
    try {
      const { symbol } = this;

      const wallet = await this.prisma.cryptoWallet.findFirst({
        where: {
          symbol,
          address,
        },
      });
      if (!wallet) throw Error(`${symbol} Wallet ${address} Not Found!`);

      const balance = await this.ETHService.getBalance(address);
      const result = { ...wallet, balance };

      return result;
    } catch (e) {
      console.log({ e });
      return null;
    }
  }

  async create(createDto: CreateETHWalletDto): Promise<CryptoWallet> {
    try {
      const { symbol } = this;

      // Creating ETH Account
      const account = await this.ETHService.create();
      if (!account) throw Error(`${symbol} Account Not Generated!`);

      const { address } = account;
      const data = {
        ...createDto,
        address,
        symbol,
      };

      // Creating Crypto Wallet
      const createdWallet = await this.prisma.cryptoWallet.create({ data });
      if (!createdWallet) throw Error(`${symbol} Crypto Wallet Not Created!`);

      return createdWallet;
    } catch (e) {
      console.log({ e });
      return null;
    }
  }

  async sendTransaction({
    value,
    from,
    to,
  }: {
    value: number;
    from?: string;
    to: string;
  }) {
    try {
      const result = await this.ETHService.sendTransaction(value, to);
      return result;
    } catch (e) {
      console.log({ e });
    }
  }
}
