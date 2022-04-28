export class SignCoinbaseExchangeMessageDto {}

export class CoinbaseExchangeRequestDto<T = any> {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: object;
  body?: T;
}

export class CoinbaseExchangeRequestSignDto {
  key: string;
  secret: string;
  passphrase: string;
  signature: string;
  timestamp: number;
}

export class CoinbaseExchangeProfileDto {
  id: string;
  user_id: string;
  name: string;
  active: boolean;
  is_default: boolean;
  created_at: Date;
}
