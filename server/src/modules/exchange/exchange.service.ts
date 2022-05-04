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

  async calculateTx(data: ExchangeRequestDto): Promise<ExchangeRequestDto> {
    try {
      const { tokenA, tokenB, to } = data;

      const calculatedTx = await this.cryptoWalletService.calculateTx(data);

      const withdrawalFee = await this.coinbaseService.getWithdrawalFee({
        input_currency: tokenA,
        currency: tokenB,
        crypto_address: to,
      });

      const { input, output, fee, serviceFee } = calculatedTx;

      const result = {
        ...data,
        fee: this.coinmarketService.round(fee + withdrawalFee, 9),
        serviceFee,
        input: this.coinmarketService.round(input + withdrawalFee, 9),
        output: await this.coinmarketService.convert({
          tokenA,
          tokenB,
          value: output,
        }),
      };

      return result;
    } catch (e) {
      console.log({ e });
    }
  }

  async createOrder(data: ExchangeRequestDto) {
    try {
      const { from, to, value, tokenA, tokenB } = data;

      // Checking Exchange Wallet
      const coinbaseAccount = await this.coinbaseService.getAccountByToken(
        tokenA,
      );
      const coinbaseAddress = this.coinbaseService.getAddressByToken(tokenA);
      const { profile_id } = coinbaseAccount;

      const calculatedOrder = await this.calculateTx({
        ...data,
        profile_id,
      });

      console.log({ profile_id, coinbaseAddress, data });

      return calculatedOrder;

      // const withdrawalFee = await this.coinbaseService.getWithdrawalFee({
      //   profile_id,
      //   amount: `${value}`,
      //   currency: tokenB,
      //   crypto_address: '0xC1e05A901aCe94Be38797671cA859411666a0325',
      // });

      // console.log({ withdrawalFee });

      // Testing
      // const withd = await this.coinbaseService.withdrawToAddress({
      //   profile_id,
      //   currency: 'ETH',
      //   crypto_address: '0xC1e05A901aCe94Be38797671cA859411666a0325',
      //   amount: '0.0025',
      // });

      // console.log({ withd });

      // const exchan = await this.coinbaseService.createOrder({
      //   profile_id,
      //   product_id: 'ETH-BTC',
      //   side: 'buy',
      //   type: 'market',
      //   size: `0.0025`,
      // });

      // console.log({ exchan });

      // const funds = await this.coinbaseService.getAccounts([
      //   'BTC',
      //   'ETH',
      //   'USDT',
      // ]);

      // console.log({ funds });
      return;

      // return;

      // Coinbase: Deposit
      const deposit = await this.cryptoWalletService.transfer({
        from,
        to: coinbaseAddress,
        value,
      });
      if (!deposit) throw Error('Exchange: Deposit Failed!');

      // Coinbase: Exchange
      const exchange = await this.coinbaseService.createOrder({
        profile_id,
        product_id: `${tokenB}-${tokenA}`,
        side: 'buy',
        type: 'market',
        size: `${deposit.output}`,
      });
      if (!exchange) throw Error('Exchange: Exchange Failed!');

      console.log({ exchange });

      return;

      // Coinbase: Withdraw
      const withdrawal = await this.coinbaseService.withdrawToAddress({
        profile_id,
        amount: '0.0001',
        currency: 'BTC',
        crypto_address: '17qce5k1P61wwdGrMYFJSrriNwG8cE9HVf',
      });
      if (!withdrawal) throw Error('Exchange: Withdrawal Failed!');

      console.log({ withdrawal });

      return withdrawal;
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
