import axios from 'axios';
import crypto from 'crypto';
import {
  CoinbaseExchangeProfileDto,
  CoinbaseExchangeRequestDto,
  CoinbaseExchangeRequestSignDto,
} from './coinbase-exchange.dto';

const {
  COINBASE_API,
  COINBASE_EXCHANGE_API,
  COINBASE_EXCHANGE_API_KEY,
  COINBASE_EXCHANGE_KEY,
  COINBASE_EXCHANGE_SECRET,
  COINBASE_EXCHANGE_PASSPHRASE,
} = process.env;

export class CoinbaseExchangeService {
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
  }: CoinbaseExchangeRequestDto): Promise<CoinbaseExchangeRequestSignDto> {
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
  }: CoinbaseExchangeRequestDto): Promise<any> {
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
      console.log({ e });
      return null;
    }
  }

  async getProfiles(): Promise<CoinbaseExchangeProfileDto[]> {
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

  async getProfile(id: string): Promise<CoinbaseExchangeProfileDto> {
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
}
