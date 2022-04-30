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
} from './coinbase.dto';

const {
  COINBASE_API,
  COINBASE_EXCHANGE_API,
  COINBASE_EXCHANGE_KEY,
  COINBASE_EXCHANGE_SECRET,
  COINBASE_EXCHANGE_PASSPHRASE,
} = process.env;

export class CoinbaseService {
  private fetch = axios.create({ baseURL: `${COINBASE_EXCHANGE_API}/` });
  private coinbase = axios.create({ baseURL: `${COINBASE_API}/` });

  private COINBASE_EXCHANGE_KEY = COINBASE_EXCHANGE_KEY;
  private COINBASE_EXCHANGE_SECRET = COINBASE_EXCHANGE_SECRET;
  private COINBASE_EXCHANGE_PASSPHRASE = COINBASE_EXCHANGE_PASSPHRASE;

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

  async request({
    path,
    method,
    headers,
    body,
  }: CoinbaseRequestDto): Promise<any> {
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

  async getAccounts(): Promise<CoinbaseAccountDto[]> {
    try {
      const result = await this.request({
        path: 'accounts',
        method: 'GET',
      });

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
}
