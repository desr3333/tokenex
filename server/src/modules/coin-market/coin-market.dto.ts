export class CoinmarketTickerDto {
  id: string;
  name: string;
  symbol: string;
  price: number;
  volume_change_24h: number;
  percent_change_24h: number;
  market_cap: number;
  market_cap_dominance: number;
  last_updated: Date;
}

export type TokenSymbol = 'BTC' | 'ETH' | 'USDT' | string;

export class CoinmarketConvertRequestDto {
  tokenA: TokenSymbol;
  tokenB: TokenSymbol;
  value: number;
}
