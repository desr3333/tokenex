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
import { NotificationService } from '@modules/notification';
import { TelegramAccountService } from '@modules/telegram-account';
import { TransactionService } from '@modules/transaction';

@Injectable()
export class CryptoWalletService {
  constructor(
    private prisma: PrismaService,
    private notificationService: NotificationService,
    private transactionService: TransactionService,
    private bitcoinService: BitcoinService,
    private ethereumService: EthereumService,
  ) {}

  async query() {
    return [];
  }

  async getAll(where?: Prisma.CryptoWalletWhereInput) {
    try {
      const result = this.prisma.cryptoWallet.findMany({ where });
      return result;
    } catch (e) {
      console.log({ e });
      return [];
    }
  }

  async findOne(
    where?: Prisma.CryptoWalletWhereUniqueInput,
    include?: Prisma.CryptoWalletInclude,
  ): Promise<CryptoWallet> {
    try {
      const result = await this.prisma.cryptoWallet.findUnique({
        where,
        include: { token: true, ...include },
      });
      if (!result) throw Error('Crypto Wallet Not Found!');

      const { address, symbol } = result;
      const balance = await this.getBalance({ address, symbol });

      // Updating Balance
      if (result.balance !== balance) {
        await this.update(where, { balance });

        return this.prisma.cryptoWallet.findUnique({
          where,
          include: { token: true },
        });
      }

      return result;
    } catch (e) {
      console.log({ e });
    }
  }

  async create(data: CreateCryptoWalletDto) {
    try {
      const symbol = data.symbol?.toUpperCase();

      let keyPair: CryptoWalletKeyPair;

      switch (symbol) {
        case Token.BTC:
          keyPair = await this.bitcoinService.create();
          break;
        case Token.ETH:
          keyPair = await this.ethereumService.create();
          break;
        case Token.USDT:
          // keyPair = await this.USDTService.create();
          break;
        default:
          throw Error('Incorrect Symbol!');
      }

      const result = await this.prisma.cryptoWallet.create({
        data: {
          ...data,
          ...keyPair,
        },
      });
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
          balance = await this.bitcoinService.getBalance(address);
          break;
        case Token.ETH:
          balance = await this.ethereumService.getBalance(address);
          break;
        case Token.USDT:
          balance = await this.ethereumService.getBalance(address);
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
          balance = await this.bitcoinService.getBalance(address);
          break;
        case Token.ETH:
          balance = await this.ethereumService.getBalance(address);
          break;
        case Token.USDT:
          balance = await this.ethereumService.getBalance(address);
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

  async transfer(
    transferdto: CryptoWalletTransferDto,
    callback?: (data: any) => void,
  ) {
    try {
      const { from, to, value } = transferdto;

      let transaction: CryptoWalletTransactionDto;

      // Checking Wallet
      const wallet = await this.findOne({ address: from });
      if (!wallet) throw Error(`Wallet Not Found!`);

      // Checking Balance
      const isBalanceSufficient = wallet.balance >= value;
      if (!isBalanceSufficient) throw Error(`Wallet Has Insufficient Funds!`);

      const { symbol, privateKey } = wallet;

      // Creating Transaction
      const _transaction = await this.transactionService.create({
        from,
        to,
        value,
      });
      if (!_transaction) throw Error('Transfer Error!');

      // Sending Transaction
      switch (symbol) {
        case Token.BTC:
          transaction = await this.bitcoinService.sendTransaction({
            value,
            from,
            to,
            privateKey,
          });
          break;
        case Token.ETH:
          transaction = await this.ethereumService.sendTransaction({
            value,
            from,
            to,
            privateKey,
          });
          break;
        case Token.USDT:
          // this.USDTService.sendTransaction({
          //   value,
          //   from,
          //   to,
          //   privateKey,
          // }).then(callback);
          break;
        default:
          throw Error('Transfer Error!');
      }

      // Updating Transaction
      this.transactionService.update({
        where: { id: _transaction.id },
        data: { hash: transaction.hash },
      });

      // Executing Callback
      if (callback) callback(transaction);

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
          transaction = await this.bitcoinService.calculateTx({
            chain: 'BTC',
            value,
            from,
            to,
          });
          break;
        case Token.ETH:
          transaction = await this.ethereumService.calculateTx({
            chain: 'ETH',
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
