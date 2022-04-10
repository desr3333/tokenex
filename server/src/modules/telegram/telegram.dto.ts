import { InlineKeyboardMarkup } from 'typegram';

export class TelegramTextMessageDto {
  chat_id: number;
  text: string;
  extra?: InlineKeyboardMarkup;
}
