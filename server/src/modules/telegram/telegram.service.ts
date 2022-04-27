import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

import {
  TelegramNotificationDto,
  TelegramTextMessageDto,
} from './telegram.dto';

const { TELEGRAM_BOT_WEBHOOK } = process.env;

@Injectable()
export class TelegramService {
  private fetch: AxiosInstance;

  constructor() {
    this.fetch = axios.create({ baseURL: `${TELEGRAM_BOT_WEBHOOK}/` });
  }

  async sendMessage(
    data: TelegramTextMessageDto,
  ): Promise<TelegramTextMessageDto> {
    try {
      const response = await this.fetch.post('messages', data);
      if (!response) throw Error('Telegram Message Not Sent!');

      return data;
    } catch (e) {
      console.log({ e });
      return null;
    }
  }

  async sendNotification(
    data: TelegramNotificationDto,
  ): Promise<TelegramNotificationDto> {
    try {
      const response = await this.fetch.post('notifications', data);
      if (!response) throw Error('Telegram Notification Not Sent!');

      return data;
    } catch (e) {
      console.log({ e });
      return null;
    }
  }
}
