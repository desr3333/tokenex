import { TelegramNotication } from "helpers";
import { ExtraReplyMessage } from "telegraf/typings/telegram-types";

export type TokenSymbol = "BTC" | "ETH" | "USDT";

export class WalletDto {
  id: number;
  account: any;
  cryptoWallets?: any[];
  createdAt?: Date;
  updatedAt?: Date;
}

export class TransactionDto {
  from?: string;
  to?: string;
  value?: number;
  tx?: string;
  nonce?: number;
  gas?: number;
  explorerLink?: string;
  fee?: number;
  serviceFee?: number;
  input?: number;
  output?: number;
  cryptoWallet?: CryptoWalletDto;
}

export class ExchangeDto {
  tokenA: string;
  tokenB: string;
  from: string;
  to: string;
  value: number;
  walletId?: number;
}

export class CryptoWalletDto {
  address?: string;
  balance?: number;
  symbol?: string;
  feeAddress?: string;
  depositFee?: number;
  withdrawFee?: number;
  raindropFee?: number;
}

export class TokenDto {}

export class TelegramTextMessageDto {
  chat_id: number;
  text: string;
  extra?: ExtraReplyMessage;
}

export class TelegramNotificationDto<T = any> {
  chat_id: number;
  type: TelegramNotificationType;
  payload: T;
}

export type TelegramNotificationType =
  | "TRANSACTION_CONFIRMED"
  | "TRANSACTION_CANCELED"
  | "UPDATE";
