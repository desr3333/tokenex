export enum Token {
  BTC = 'BTC',
  ETH = 'ETH',
  USDT = 'USDT',
}

export enum TransactionType {
  TRANSACTION = 'TRANSACTION',
  WITHDRAW = 'WITHDRAW',
  DEPOSIT = 'DEPOSIT',
  RAINDROP = 'RAINDROP',
}
export enum TransactionStatus {}

export enum TransactionFeeStatus {
  PENDING = 'PENDING',
  BLOCKED = 'BLOCKED',
  FULFILLED = 'FULFILLED',
  FAILED = 'FAILED',
}
