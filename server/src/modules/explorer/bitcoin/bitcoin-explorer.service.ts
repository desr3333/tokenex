import { Injectable } from '@nestjs/common';
import axios from 'axios';

import { BitcoinService } from '@modules/blockchain/bitcoin';

import { BitcoinTransactionDto } from './bitcoin-explorer.dto';

export const {
  BTC_NODE_API_KEY,
  BTC_EXPLORER_MAINNET,
  BTC_EXPLORER_TESTNET,
  BTC_NET,
} = process.env;

@Injectable()
export class BitcoinExplorerService {
  constructor(private bitcoinService: BitcoinService) {}

  EXPLORER =
    BTC_NET === 'mainnet' ? BTC_EXPLORER_MAINNET : BTC_EXPLORER_TESTNET;

  fetch = axios.create({
    baseURL: `${this.EXPLORER}/`,
    headers: {
      'api-key': BTC_NODE_API_KEY,
    },
  });

  async getAddress(address: string) {
    try {
      const response = await this.fetch.get(`address/${address}`);
      return response.data;
    } catch (e) {
      console.log([e]);
      return null;
    }
  }

  async getTransaction(tx: string): Promise<BitcoinTransactionDto> {
    try {
      const response = await this.fetch.get(`tx/${tx}`);
      const data = response.data;

      const { txid, blockHash, blockHeight, confirmations } = data;

      console.log({ data });
      const value = Number(data?.value);
      const from = data?.vin?.[0]?.addresses?.[0];
      const to = data?.vout?.[0]?.addresses?.[0];

      const result: BitcoinTransactionDto = {
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
