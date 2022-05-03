import { Injectable } from '@nestjs/common';
import axios from 'axios';

import { CoinmarketTicker } from './coin-market.dto';

const { COINDATA_API, COINDATA_API_KEY } = process.env;

@Injectable()
export class CoinmarketService {
  private fetch;

  constructor() {
    this.fetch = axios.create({
      baseURL: `${COINDATA_API}/`,
      headers: { 'X-CMC_PRO_API_KEY': COINDATA_API_KEY },
    });
  }

  async getTickers(symbols: string[]): Promise<CoinmarketTicker[]> {
    try {
      if (!symbols.length) return [];

      const response = await this.fetch.get(
        `cryptocurrency/quotes/latest?symbol=${symbols.join(',')}`,
      );

      const data = response.data.data;

      const result: CoinmarketTicker[] = symbols?.map((symbol) => {
        const ticker = data[symbol];

        const { id, name } = ticker;
        const quote = ticker?.quote['USD'];

        return {
          id,
          name,
          symbol,
          price: this.round(quote?.price, 2) || 0,
          volume_change_24h: this.round(quote?.volume_change_24h, 4) || 0,
          percent_change_24h: this.round(quote?.percent_change_24h, 4) || 0,
          market_cap: this.round(quote?.market_cap) || 0,
          market_cap_dominance: this.round(quote?.market_cap_dominance, 2) || 0,
          last_updated: quote?.last_updated || null,
        };
      });

      return result;
    } catch (e) {
      console.log({ e });
    }
  }

  async getTicker(symbol: string): Promise<CoinmarketTicker> {
    try {
      if (!symbol) throw Error(`Ticker ${symbol} Not Found!`);

      const response = await this.fetch.get(
        `cryptocurrency/quotes/latest?symbol=${symbol}`,
      );

      const data = response.data.data;

      const ticker = data[symbol];
      const { id, name } = ticker;
      const quote = ticker?.quote['USD'];

      const result = {
        id,
        name,
        symbol,
        price: this.round(quote?.price, 2) || 0,
        volume_change_24h: this.round(quote?.volume_change_24h, 4) || 0,
        percent_change_24h: this.round(quote?.percent_change_24h, 4) || 0,
        market_cap: this.round(quote?.market_cap) || 0,
        market_cap_dominance: this.round(quote?.market_cap_dominance, 2) || 0,
        last_updated: quote?.last_updated || null,
      };

      return result;
    } catch (e) {
      console.log({ e });
    }
  }

  round(number: number, toFixed = 0): number {
    return Number(number.toFixed(toFixed));
  }
}
