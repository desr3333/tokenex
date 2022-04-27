import { InlineKeyboardMarkup } from 'typegram';

export class TelegramTextMessageDto {
  chat_id: number;
  text: string;
  extra?: InlineKeyboardMarkup;
}

// export class TelegramNotificationDto {}

// export type TelegramNotificationType = any;
