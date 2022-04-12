import { TelegramNotication } from "helpers";
import { ExtraReplyMessage } from "telegraf/typings/telegram-types";

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
  cryptoWallet?: CryptoWalletDto;
  explorerLink?: string;
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
  type: string;
  chat_id: number;
  data: T;
}
