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
  UpdateCryptoWalletDto,
} from './crypto-wallet.dto';

import { BitcoinService } from '@modules/blockchain/bitcoin';
import { EthereumService } from '@modules/blockchain/ethereum';

@Injectable()
export class CryptoWalletService {
  constructor(
    private prisma: PrismaService,
    private BitcoinService: BitcoinService,
    private EthereumService: EthereumService,
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

  async findOne(
    where?: Prisma.CryptoWalletWhereUniqueInput,
  ): Promise<CryptoWallet> {
    try {
      const result = await this.prisma.cryptoWallet.findFirst({
        where,
        include: { token: true },
      });

      const { address, symbol } = result;
      const balance = await this.getBalance({ address, symbol });

      // Updating Balance
      if (result.balance !== balance) {
        await this.update(where, { balance });

        const result = await this.prisma.cryptoWallet.findFirst({
          where,
          include: { token: true },
        });

        return result;
      }

      return result;
    } catch (e) {
      console.log({ e });
    }
  }

  async create(createDto: CreateCryptoWalletDto) {
    try {
      const symbol = createDto.symbol?.toUpperCase();

      let keyPair: CryptoWalletKeyPair;

      switch (symbol) {
        case Token.BTC:
          keyPair = await this.BitcoinService.create();
          break;
        case Token.ETH:
          keyPair = await this.EthereumService.create();
          break;
        case Token.USDT:
          // keyPair = await this.USDTService.create();
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
        where,
        data,
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

  async getBalance(cryptoWalletDto: UpdateCryptoWalletDto): Promise<number> {
    try {
      const { symbol, address } = cryptoWalletDto;

      let balance: number;

      switch (symbol) {
        case Token.BTC:
          balance = await this.BitcoinService.getBalance(address);
          break;
        case Token.ETH:
          balance = await this.EthereumService.getBalance(address);
          break;
        case Token.USDT:
          balance = await this.EthereumService.getBalance(address);
          break;
        default:
          throw Error('Incorrect Symbol!');
      }

      return balance;
    } catch (e) {
      console.log({ e });
      return null;
    }
  }

  async updateBalance(updateDto: UpdateCryptoWalletDto): Promise<void> {
    try {
      const { symbol, address } = updateDto;

      let balance: number;

      //  console.log(`⌛️ Updating Balance > ${symbol}:${address}`);

      // Fetching Balance
      switch (symbol) {
        case Token.BTC:
          balance = await this.BitcoinService.getBalance(address);
          break;
        case Token.ETH:
          balance = await this.EthereumService.getBalance(address);
          break;
        case Token.USDT:
          balance = await this.EthereumService.getBalance(address);
          break;
        default:
          throw Error('Balance Update Error!');
      }

      // Updating Balance
      this.update({ address }, { balance });
    } catch (e) {
      console.log({ e });
    }
  }

  async transfer(transferdto: CryptoWalletTransferDto) {
    try {
      const { from, to, value } = transferdto;

      let transaction: CryptoWalletTransactionDto;

      // Checking Wallet
      const wallet = await this.findOne({ address: from });
      if (!wallet) throw Error(`Wallet Not Found!`);

      // Checking Balance
      const isBalanceSufficient = wallet.balance >= value;
      if (!isBalanceSufficient) throw Error(`Wallet Has Insufficient Balance!`);

      // Sending Transaction
      const { symbol, privateKey } = wallet;

      switch (symbol) {
        case Token.BTC:
          transaction = await this.BitcoinService.sendTransaction({
            value,
            from,
            to,
            privateKey,
          });
          break;
        case Token.ETH:
          transaction = await this.EthereumService.sendTransaction({
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

  async calculateTx(transferdto: CryptoWalletTransferDto) {
    try {
      const { from, to, value } = transferdto;

      let transaction: CryptoWalletTransactionDto;

      // Checking Wallet
      const cryptoWallet = await this.findOne({ address: from });
      if (!cryptoWallet) throw Error(`Wallet Not Found!`);

      // Calculating Transaction
      switch (cryptoWallet.symbol) {
        case Token.BTC:
          transaction = await this.BitcoinService.calculateTx({
            value,
            from,
            to,
          });
          break;
        case Token.ETH:
          transaction = await this.EthereumService.calculateTx({
            value,
            from,
            to,
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
}
