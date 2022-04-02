import { Injectable } from '@nestjs/common';
import { CryptoWallet, Prisma } from '@prisma/client';

import { Token } from '@types';
import { PrismaService } from '@modules/prisma';
import {
  CreateCryptoWalletDto,
  CryptoWalletKeyPair,
  CryptoWalletTransactionDto,
  CryptoWalletTransferDto,
  CryptoWalletWithdrawDto,
} from './crypto-wallet.dto';

import { ETHService } from '@modules/token/eth';
import { USDTService } from '@modules/token/usdt';
import { BTCService } from '@modules/token/btc';

@Injectable()
export class CryptoWalletService {
  constructor(
    private prisma: PrismaService,
    private BTCService: BTCService,
    private ETHService: ETHService,
    private USDTService: USDTService,
  ) {}

  async query() {
    return [];
  }

  async getAll() {
    try {
      const result = this.prisma.cryptoWallet.findMany();
      return result;
    } catch (e) {
      console.log({ e });
      return [];
    }
  }

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

  async findOneByAddress(address: string) {
    try {
      // Updating
      const balance = '';

      // Fetching
      const result = await this.findOne({ address });
      return result;
    } catch (e) {
      console.log({ e });
      return null;
    }
  }

  async create(createDto: CreateCryptoWalletDto) {
    try {
      const symbol = createDto.symbol?.toUpperCase();

      let keyPair: CryptoWalletKeyPair;

      switch (symbol) {
        case Token.BTC:
          keyPair = await this.BTCService.create();
          break;
        case Token.ETH:
          keyPair = await this.ETHService.create();
          break;
        case Token.USDT:
          keyPair = await this.USDTService.create();
          break;
        default:
          throw Error('Incorrect Symbol!');
      }

      const data = {
        ...createDto,
        ...keyPair,
      };

      const result = await this.prisma.cryptoWallet.create({ data });
      if (!result) throw Error(`${symbol} Crypto Wallet Not Created!`);

      return result;
    } catch (e) {
      console.log({ e });
      return null;
    }
  }

  async update(
    where: Prisma.CryptoWalletWhereUniqueInput,
    data: Prisma.CryptoWalletUpdateInput,
  ): Promise<CryptoWallet> {
    try {
      const result = await this.prisma.cryptoWallet.update({
        data,
        where,
      });
      return result;
    } catch (e) {
      console.log({ e });
      return null;
    }
  }

  async delete(
    where: Prisma.CryptoWalletWhereUniqueInput,
  ): Promise<CryptoWallet> {
    try {
      const result = await this.prisma.cryptoWallet.delete({
        where,
      });
      return result;
    } catch (e) {
      console.log({ e });
      return null;
    }
  }

  async transfer(transferdto: CryptoWalletTransferDto) {
    try {
      const { from, to, value } = transferdto;

      let transaction: CryptoWalletTransactionDto;

      // Checking Wallet
      const wallet = await this.findOneByAddress(from);
      if (!wallet) throw Error(`Wallet Not Found!`);

      // Calculating Transaction
      const totalCharge = await this.ETHService.calculateTransaction(
        transferdto,
      );

      // Checking Balance
      const isBalanceSufficient = wallet.balance >= totalCharge;
      if (!isBalanceSufficient) throw Error(`Wallet Has Insufficient Balance!`);

      // Sending Transaction
      const { symbol, privateKey } = wallet;

      switch (symbol) {
        case Token.BTC:
          // keyPair = await this.BTCService.create();
          break;
        case Token.ETH:
          transaction = await this.ETHService.sendTransaction({
            value,
            from,
            to,
            privateKey,
          });
          break;
        case Token.USDT:
          // transaction = await this.USDTService.sendTransaction({
          //   value,
          //   from,
          //   to,
          //   privateKey,
          // });
          break;
        default:
          throw Error('Transfer Error!');
      }

      return transaction;
    } catch (e) {
      console.log({ e });
    }
  }

  async withdraw(withdrawDto: CryptoWalletWithdrawDto) {
    try {
      const result = await this.transfer(withdrawDto);
      if (!result) throw Error('Withdrawal Failed!');

      return result;
    } catch (e) {
      console.log({ e });
      return null;
    }
  }
}
