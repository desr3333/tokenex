import { InlineKeyboardMarkup } from 'typegram';

export class TelegramTextMessageDto {
  chat_id: number;
  text: string;
  extra?: InlineKeyboardMarkup;
}

export class TelegramNotificationDto<T = any> {
  chat_id: number;
  type: TelegramNotificationType;
  data: T;
}

export type TelegramNotificationType = 'TRANSACTION';
