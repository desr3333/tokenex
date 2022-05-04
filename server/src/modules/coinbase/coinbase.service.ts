import { CoinmarketService, TokenSymbol } from '@modules/coin-market';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import crypto from 'crypto';
import {
  CoinbaseAccountDto,
  CoinbaseOrderCreateDto,
  CoinbaseProductDto,
  CoinbaseProfileDto,
  CoinbaseRequestDto,
  CoinbaseRequestSignDto,
  CoinbaseOrderDto,
  CoinbaseProductId,
  CoinbaseDepositFromCoinbaseAccountDto,
  CoinbaseWithdrawToAddressDto,
  CoinbaseWithdrawalFeeDto,
} from './coinbase.dto';

const {
  COINBASE_API,
  COINBASE_EXCHANGE_API,
  COINBASE_EXCHANGE_KEY,
  COINBASE_EXCHANGE_SECRET,
  COINBASE_EXCHANGE_PASSPHRASE,
} = process.env;

@Injectable()
export class CoinbaseService {
  constructor(private coinmarketService: CoinmarketService) {}

  fetch = axios.create({ baseURL: `${COINBASE_EXCHANGE_API}/` });
  coinbase = axios.create({ baseURL: `${COINBASE_API}/` });

  COINBASE_EXCHANGE_KEY = COINBASE_EXCHANGE_KEY;
  COINBASE_EXCHANGE_SECRET = COINBASE_EXCHANGE_SECRET;
  COINBASE_EXCHANGE_PASSPHRASE = COINBASE_EXCHANGE_PASSPHRASE;

  async getServerTime(): Promise<number> {
    try {
      const response = await this.coinbase.get('time');
      return response.data.data.epoch;
    } catch (e) {
      console.log({ e });
      return null;
    }
  }

  async signRequest({
    path,
    method,
    body,
  }: CoinbaseRequestDto): Promise<CoinbaseRequestSignDto> {
    const timestamp = await this.getServerTime();
    const payload = body ? JSON.stringify(body) : '';

    const key = this.COINBASE_EXCHANGE_KEY;
    const passphrase = this.COINBASE_EXCHANGE_PASSPHRASE;
    const secret = this.COINBASE_EXCHANGE_SECRET;

    const message = timestamp + method + `/${path}` + payload;
    const hmac = crypto.createHmac('sha256', Buffer.from(secret, 'base64'));
    const signature = hmac.update(message).digest('base64');

    return {
      key,
      passphrase,
      secret,
      signature,
      timestamp,
    };
  }

  async request<T = any>({
    path,
    method,
    headers,
    body,
  }: CoinbaseRequestDto): Promise<T> {
    try {
      // Signing
      const { key, passphrase, signature, timestamp } = await this.signRequest({
        path,
        method,
        body,
      });

      // Sending
      const response = await this.fetch.request({
        url: path,
        method,
        headers: {
          'CB-ACCESS-KEY': key,
          'CB-ACCESS-PASSPHRASE': passphrase,
          'CB-ACCESS-TIMESTAMP': timestamp,
          'CB-ACCESS-SIGN': signature,
          ...headers,
        },
        data: body,
      });

      // console.log({
      //   'CB-ACCESS-KEY': key,
      //   'CB-ACCESS-PASSPHRASE': passphrase,
      //   'CB-ACCESS-TIMESTAMP': timestamp,
      //   'CB-ACCESS-SIGN': signature,
      // });

      return response.data;
    } catch (e) {
      console.log(e?.response?.data);
      return null;
    }
  }

  async getProfiles(): Promise<CoinbaseProfileDto[]> {
    try {
      const result = await this.request({
        path: 'profiles',
        method: 'GET',
      });

      return result;
    } catch (e) {
      console.log(e?.response?.data);
      return [];
    }
  }

  async getProfileById(id: string): Promise<CoinbaseProfileDto> {
    try {
      const result = await this.request({
        path: `profiles/${id}`,
        method: 'GET',
      });

      return result;
    } catch (e) {
      console.log(e?.response?.data);
      return null;
    }
  }

  async getAccounts(tokens?: TokenSymbol[]): Promise<CoinbaseAccountDto[]> {
    try {
      const result = await this.request({
        path: 'accounts',
        method: 'GET',
      });

      if (tokens.length)
        return result?.filter((i) => tokens.includes(i?.currency));

      return result;
    } catch (e) {
      console.log(e?.response?.data);
      return [];
    }
  }

  async getAccountById(id: string): Promise<CoinbaseAccountDto> {
    try {
      const result = await this.request({
        path: `accounts/${id}`,
        method: 'GET',
      });

      return result;
    } catch (e) {
      console.log(e?.response?.data);
      return null;
    }
  }

  async getAccountByToken(token: TokenSymbol): Promise<CoinbaseAccountDto> {
    try {
      const data = await this.request<CoinbaseAccountDto[]>({
        path: `accounts`,
        method: 'GET',
      });

      const result = data?.filter(({ currency }) => currency === token)?.[0];
      return result;
    } catch (e) {
      console.log(e?.response?.data);
      return null;
    }
  }

  getAddressByToken(token: TokenSymbol): string {
    try {
      const {
        COINBASE_EXCHANGE_BTC_ADDRESS,
        COINBASE_EXCHANGE_ETH_ADDRESS,
        COINBASE_EXCHANGE_USDT_ADDRESS,
      } = process.env;

      switch (token) {
        case 'BTC':
          return COINBASE_EXCHANGE_BTC_ADDRESS;
        case 'ETH':
          return COINBASE_EXCHANGE_ETH_ADDRESS;
        case 'USDT':
          return COINBASE_EXCHANGE_USDT_ADDRESS;
        default:
          return null;
      }
    } catch (e) {
      console.log(e?.response?.data);
      return null;
    }
  }

  async getCoinbaseAccounts(): Promise<CoinbaseAccountDto[]> {
    try {
      const result = await this.request({
        path: 'coinbase-accounts',
        method: 'GET',
      });

      return result;
    } catch (e) {
      console.log(e?.response?.data);
      return [];
    }
  }

  async getCoinbaseAccountById(id: string): Promise<CoinbaseAccountDto> {
    try {
      const result = await this.request({
        path: `coinbase-accounts/${id}`,
        method: 'GET',
      });

      return result;
    } catch (e) {
      console.log(e?.response?.data);
      return null;
    }
  }

  async getProducts(): Promise<CoinbaseProductDto[]> {
    try {
      const result = await this.request({
        path: 'products',
        method: 'GET',
      });

      return result;
    } catch (e) {
      console.log(e?.response?.data);
      return [];
    }
  }

  async getProductById(id: CoinbaseProductId): Promise<CoinbaseProductDto> {
    try {
      const result = await this.request({
        path: `products/${id}`,
        method: 'GET',
      });

      return result;
    } catch (e) {
      console.log(e?.response?.data);
      return null;
    }
  }

  async getOrders(): Promise<CoinbaseOrderDto[]> {
    try {
      const result = await this.request({
        path: 'orders',
        method: 'GET',
      });

      return result;
    } catch (e) {
      console.log(e?.response?.data);
      return [];
    }
  }

  async createOrder(
    createDto: CoinbaseOrderCreateDto,
  ): Promise<CoinbaseOrderCreateDto[]> {
    try {
      const result = await this.request({
        path: 'orders',
        method: 'POST',
        body: createDto,
      });

      return result;
    } catch (e) {
      // console.log({ e });
      return null;
    }
  }

  async getTransfers(): Promise<any[]> {
    try {
      const result = await this.request({
        path: 'transfers',
        method: 'GET',
      });

      return result;
    } catch (e) {
      console.log(e?.response?.data);
      return [];
    }
  }

  async depositFromCoinbaseAccount(
    depositDto: CoinbaseDepositFromCoinbaseAccountDto,
  ): Promise<CoinbaseDepositFromCoinbaseAccountDto> {
    try {
      const result = await this.request({
        path: 'deposits/coinbase-account',
        method: 'POST',
        body: depositDto,
      });

      return result;
    } catch (e) {
      console.log(e?.response?.data);
      return null;
    }
  }

  async withdrawToAddress(
    withdrawDto: CoinbaseWithdrawToAddressDto,
  ): Promise<CoinbaseWithdrawToAddressDto> {
    try {
      const result = await this.request({
        path: 'withdrawals/crypto',
        method: 'POST',
        body: withdrawDto,
      });

      return result;
    } catch (e) {
      console.log(e?.response?.data);
      return null;
    }
  }

  async getWithdrawalFee(
    withdrawDto: CoinbaseWithdrawalFeeDto,
  ): Promise<number> {
    try {
      const { currency, input_currency, crypto_address } = withdrawDto;

      const withdrawal = await this.request({
        path: `withdrawals/fee-estimate?currency=${currency}&crypto_address=${crypto_address}`,
        method: 'GET',
        body: withdrawDto,
      });

      if (!input_currency) return withdrawal.fee;

      const result = await this.coinmarketService.convert({
        tokenA: currency,
        tokenB: input_currency,
        value: withdrawal.fee,
      });

      return result;
    } catch (e) {
      console.log({ e });

      console.log(e?.response?.data);
      return null;
    }
  }
}
