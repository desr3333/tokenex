export class SignCoinbaseExchangeMessageDto {}

export class CoinbaseRequestDto<T = any> {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: object;
  body?: T;
}

export class CoinbaseRequestSignDto {
  key: string;
  secret: string;
  passphrase: string;
  signature: string;
  timestamp: number;
}

export class CoinbaseProfileDto {
  id: string;
  user_id: string;
  name: string;
  active: boolean;
  is_default: boolean;
  created_at: Date;
}

export class CoinbaseAccountDto {
  id: string;
  currency: string;
  balance: string;
  available: boolean;
  hold: boolean;
  profile_id: Date;
  trading_enabled: boolean;
}

export class CoinbaseOrderDto {
  'id': string;
  'product_id': string;
  'profile_id': string;
  'price': string;
  'size': string;
  'side': 'buy' | 'sell';
  'type': 'market' | 'limit';
  'time_in_force': string;
  'status': string;
  'created_at': string;
}

export class CoinbaseOrderCreateDto {
  profile_id: string;
  product_id: CoinbaseProductId;
  side: 'buy' | 'sell';
  type: 'limit' | 'market';
  price?: string;
  size?: string;
  time_in_force?: 'GTC' | 'GTT' | 'IOC';
  cancel_after?: 'min' | 'hours' | 'day';
  post_only?: boolean;
}

export type CoinbaseProductId =
  | 'BTC-USDT'
  | 'BTC-ETH'
  | 'ETH-USDT'
  | 'ETH-BTC'
  | 'USDT-BTC'
  | 'USDT-ETH';

export class CoinbaseProductDto {
  id: string;
  base_currency: string;
  quote_currency: string;
  base_min_size: '0.001';
  base_max_size: '2300';
  display_name: string;
  status: string;
}

export class CoinbaseDepositFromCoinbaseAccountDto {
  profile_id: string;
  coinbase_account_id: string;
  amount: string;
  currency: string;
}

export class CoinbaseWithdrawToAddressDto {
  profile_id: string;
  amount: string;
  currency: string;
  crypto_address: string;
}
