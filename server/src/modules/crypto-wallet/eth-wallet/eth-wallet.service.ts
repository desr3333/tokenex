import { Injectable } from '@nestjs/common';
import { CryptoWallet } from '@prisma/client';

import { PrismaService } from '@modules/prisma';
import { ETHService } from '@modules/token/eth';
import { CryptoWalletServiceBuilder } from '@modules/crypto-wallet';

import {
  CreateETHWalletDto,
  ETHWalletDepositDto,
  ETHWalletTransactionDto,
  ETHWalletWithdrawalDto,
} from './eth-wallet.dto';
import { CryptoWalletService } from '../crypto-wallet';

@Injectable()
export class ETHWalletService implements CryptoWalletServiceBuilder {
  public symbol: string;

  constructor(
    private cryptoWalletService: CryptoWalletService,
    private ETHService: ETHService,
  ) {
    this.symbol = 'ETH';
  }

  async findOneByAddress(address: string) {
    try {
      const { symbol } = this;

      // Fetching Wallet
      const wallet = await this.cryptoWalletService.findOne({
        symbol,
        address,
      });
      if (!wallet) throw Error(`${symbol} Wallet ${address} Not Found!`);

      // Updating Balance
      const walletBalance = Number(wallet.balance);
      const balance = Number(await this.ETHService.getBalance(address));

      if (walletBalance !== balance)
        await this.cryptoWalletService.update({ address }, { balance });

      const result = { ...wallet };
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

      const { address, privateKey } = account;

      const data = {
        ...createDto,
        address,
        privateKey,
        symbol,
      };

      // Creating Crypto Wallet
      const wallet = await this.cryptoWalletService.create(data);
      if (!wallet) throw Error(`${symbol} Crypto Wallet Not Created!`);

      return wallet;
    } catch (e) {
      console.log({ e });
      return null;
    }
  }

  async getBalance(address: string) {
    try {
      const result = await this.ETHService.getBalance(address);
      return result;
    } catch (e) {
      console.log({ e });
      return 0;
    }
  }

  async getGasPrice() {
    try {
      const gasPrice = await this.ETHService.getGasPrice();
      const result = this.ETHService.web3.utils.fromWei(gasPrice);
      return result;
    } catch (e) {
      console.log({ e });
      return null;
    }
  }

  async sendTransaction({
    value,
    from,
    to,
    privateKey,
  }: ETHWalletTransactionDto) {
    try {
      const result = await this.ETHService.sendTransaction({
        value,
        from,
        to,
        privateKey,
      });
      return result;
    } catch (e) {
      console.log({ e });
    }
  }

  async withdraw({ value, from, to }: ETHWalletWithdrawalDto) {
    return { value, from, to };
  }

  async deposit({ value, from, to }: ETHWalletDepositDto) {
    return { value, from, to };
  }
}
