import { Injectable } from '@nestjs/common';

import { CoinbaseService } from '@modules/coinbase';
import { CryptoWalletService } from '@modules/crypto-wallet';
import { PrismaService } from '@modules/prisma';

import {
  ExchangeCoinbaseAccountRequestDto,
  ExchangeRequestDto,
} from './exchange.dto';
import { CoinmarketService } from '@modules/coin-market';

@Injectable()
export class ExchangeService {
  constructor(
    private prisma: PrismaService,
    private coinbaseService: CoinbaseService,
    private coinmarketService: CoinmarketService,
    private cryptoWalletService: CryptoWalletService,
  ) {}

  async createOrder(data: ExchangeRequestDto) {
    try {
      const { from, to, value, tokenA, tokenB } = data;

      // Checking Exchange Wallet
      const coinbaseAccount = await this.coinbaseService.getAccountByToken(
        tokenA,
      );
      const coinbaseAddress = this.coinbaseService.getAddressByToken(tokenA);
      const { profile_id } = coinbaseAccount;

      // Testing Coinbase
      // const coinbase = {
      //   BTC: await this.coinbaseService.getAccountByToken('BTC'),
      //   ETH: await this.coinbaseService.getAccountByToken('ETH'),
      //   USDT: await this.coinbaseService.getAccountByToken('USDT'),
      // };

      // const exchange = await this.coinbaseService.createOrder({
      //   profile_id,
      //   product_id: 'ETH-BTC',
      //   side: 'sell',
      //   type: 'market',
      //   size: '0.00025',
      // });

      // console.log({ exchange });

      console.log(await this.coinbaseService.getAccountByToken('BTC'));

      // const withdraw = await this.coinbaseService.withdrawToAddress({
      //   profile_id,
      //   amount: '0.0001',
      //   currency: 'BTC',
      //   crypto_address: '17qce5k1P61wwdGrMYFJSrriNwG8cE9HVf',
      // });

      // console.log({ withdraw });

      // Checking Crypto Wallets
      // const walletA = await this.cryptoWalletService.findOne({ address: from });
      // const walletB = await this.cryptoWalletService.findOne({ address: to });
      // if (walletA?.walletId !== walletB?.walletId)
      //   throw Error('You Can Only Exchange Funds Between Your Own Wallets!');

      // Coinbase: Deposit
      // const deposit = {
      //   from: walletA.address,
      //   to: coinbaseAddress,
      // };
      // const deposit = await this.cryptoWalletService.transfer({
      //   from: walletB.address,
      //   to: coinbase.
      //   value,
      // });

      // Coinbase: Exchange
      // const size =
      //   tokenA !== 'BTC'
      //     ? await this.coinmarketService.convert({
      //         tokenA,
      //         tokenB: 'BTC',
      //         value,
      //       })
      //     : value;

      // const exchange = {
      //   profile_id,
      //   product_id: `${tokenA}-${tokenB}`,
      //   side: 'sell',
      //   type: 'market',
      //   size,
      // };

      // const exchange = await this.coinbaseService.createOrder({
      // profile_id,
      // product_id: `${tokenA}-${tokenB}`,
      // side: 'sell',
      // type: 'market',
      // size: value.toString(),
      // });

      // Coinbase: Withdraw
      // const withdrawal = {
      // profile_id,
      // amount: value,
      // currency: tokenB,
      // crypto_address: walletB.address,
      // };
      // const withdrawal = await this.coinbaseService.withdrawToAddress({
      //   profile_id,
      //   amount: string;
      //   currency: string;
      //   crypto_address: string; });

      // console.log({
      //   data,
      //   deposit,
      //   exchange,
      //   withdrawal,
      //   coinbaseAccount,
      // });

      const result = {};

      return result;
    } catch (e) {
      console.log({ e });
      return e;
    }
  }

  // TODO
  // [ ] swap
  // [ ] createOrder
  // [ ] cancelOrder
}
