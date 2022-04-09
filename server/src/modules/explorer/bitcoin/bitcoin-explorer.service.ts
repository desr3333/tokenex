import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

import { BitcoinService } from '@modules/blockchain/bitcoin';
import { BTCTransactionDto } from './bitcoin-explorer.dto';

export const { NOWNODES_API_KEY, BTC_EXPLORER, ETH_EXPLORER } = process.env;

@Injectable()
export class BitcoinExplorerService {
  private fetch: AxiosInstance;

  constructor(private BitcoinService: BitcoinService) {
    this.fetch = axios.create({
      baseURL: `${BTC_EXPLORER}/`,
      headers: {
        'api-key': NOWNODES_API_KEY,
      },
    });
  }

  async getAddress(address: string) {
    try {
      const response = await this.fetch.get(`address/${address}`);
      return response.data;
    } catch (e) {
      console.log([e]);
      return null;
    }
  }

  async getTransaction(tx: string): Promise<BTCTransactionDto> {
    try {
      const response = await this.fetch.get(`tx/${tx}`);
      const data = response.data;

      const { txid, blockHash, blockHeight, confirmations } = data;

      console.log({ data });
      const value = Number(data?.value);
      const from = data?.vin?.[0]?.addresses?.[0];
      const to = data?.vout?.[0]?.addresses?.[0];

      const result: BTCTransactionDto = {
        txid,
        from,
        to,
        value,
        blockHash,
        blockHeight,
        confirmations,
      };

      return result;
    } catch (e) {
      console.log({ e });
      console.log(e?.response?.data);
      return null;
    }
  }
}
