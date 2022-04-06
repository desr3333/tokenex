export class CoindataTicker {
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