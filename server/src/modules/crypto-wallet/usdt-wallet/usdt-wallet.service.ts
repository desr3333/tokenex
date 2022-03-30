import { Injectable } from '@nestjs/common';
import { CryptoWallet } from '@prisma/client';

import { PrismaService } from '@modules/prisma';
import {
  CryptoWalletService,
  CryptoWalletServiceBuilder,
} from '@modules/crypto-wallet/crypto-wallet';
import { USDTService } from '@modules/token/usdt';

import { CreateUSDTWalletDto, USDTTransferDto } from './usdt-wallet.dto';

@Injectable()
export class USDTWalletService implements CryptoWalletServiceBuilder {
  public symbol: string;

  constructor(
    private prisma: PrismaService,
    private cryptoWalletService: CryptoWalletService,
    private USDTService: USDTService,
  ) {
    this.symbol = 'USDT';
  }

  async findOneByAddress(address: string) {
    try {
      const { symbol } = this;

      const wallet = await this.cryptoWalletService.findOne({
        symbol,
        address,
      });
      if (!wallet) throw Error(`${symbol} Wallet ${address} Not Found!`);

      const balance = await this.USDTService.getBalance(address);
      const result = { ...wallet, balance };

      return result;
    } catch (e) {
      console.log({ e });
      return null;
    }
  }

  async create(createDto: CreateUSDTWalletDto): Promise<CryptoWallet> {
    try {
      const { symbol } = this;

      // Generating Address
      const account = await this.USDTService.create();
      if (!account) throw Error(`${symbol} Account Not Generated!`);

      // Processing Data
      const { address, privateKey } = account;
      const data = {
        ...createDto,
        address,
        privateKey,
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

  async transfer({ from, to, value }: USDTTransferDto) {
    const transfer = await this.USDTService.transfer({ from, to, value });
    return transfer;
  }
}
