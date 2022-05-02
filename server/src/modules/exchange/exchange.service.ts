import { Injectable } from '@nestjs/common';

import { CoinbaseService } from '@modules/coinbase';
import { CryptoWalletService } from '@modules/crypto-wallet';

import {
  ExchangeCoinbaseAccountRequestDto,
  ExchangeRequestDto,
} from './exchange.dto';
import EventEmitter from 'events';

@Injectable()
export class ExchangeService {
  constructor(
    private coinbaseService: CoinbaseService,
    private cryptoWalletService: CryptoWalletService,
  ) {}

  async getCoinbaseAccount({ token }: ExchangeCoinbaseAccountRequestDto) {
    try {
      const result = await this.coinbaseService.getAccountByToken(token);
      return result;
    } catch (e) {
      console.log({ e });
      return null;
    }
  }

  async createOrder(data: ExchangeRequestDto) {
    try {
      const { from, to, value } = data;

      const coinbase = {
        ETH: '0xD66fE26C24AA90F31eB1b1d5FD05Cd05De77Fd07',
      };

      // Checking Crypto Wallets
      const walletA = await this.cryptoWalletService.findOne({ address: from });
      const walletB = await this.cryptoWalletService.findOne({ address: to });

      if (walletA?.walletId !== walletB?.walletId)
        throw Error('You Can Exchange Funds Only Between Your Own Wallets!');

      console.log({ walletA, walletB });

      // Coinbase: Exchange
      // Coinbase: Withdraw

      // Deposit To Coinbase
      // const deposit = await this.cryptoWalletService.transfer({
      //   from: walletA.address,
      //   to: coinbase.ETH,
      //   value,
      // });

      //  console.log({ deposit });

      const result = {};

      return result;
    } catch (e) {
      console.log({ e });
    }
  }

  // TODO
  // [ ] swap
  // [ ] createOrder
  // [ ] cancelOrder
}
