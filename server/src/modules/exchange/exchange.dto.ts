import { CoinbaseProductId } from '@modules/coinbase';

export class ExchangeRequestDto {
  tokenA: ExchangeToken;
  tokenB: ExchangeToken;
  from: string;
  to: string;
  value: number;
  walletId?: string;
  profile_id?: string;

  gas?: number;
  fee?: number;
  serviceFee?: number;
  input?: number;
  output?: number;
  explorerLink?: string;
}

export type ExchangeToken = 'BTC' | 'ETH' | 'USDT';

export class ExchangeCoinbaseAccountRequestDto {
  token: ExchangeToken;
}

export class ExchangeOrderDto {
  id: number;
  tokenA: ExchangeToken;
  tokenB: ExchangeToken;
  from: string;
  to: string;
  value: number;
  walletId?: string;
  createdAt?: Date;
  confirmedAt?: Date;
}
