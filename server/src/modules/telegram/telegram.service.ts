import {
  NotificationDto,
  TelegramNotificationDto,
} from '@modules/notification';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import axios, { AxiosInstance } from 'axios';

import { TelegramTextMessageDto } from './telegram.dto';

const { TELEGRAM_BOT_WEBHOOK } = process.env;

@Injectable()
export class TelegramService {
  private fetch: AxiosInstance;

  constructor() {
    this.fetch = axios.create({ baseURL: `${TELEGRAM_BOT_WEBHOOK}/` });
  }

  @OnEvent('telegram.message', { async: true })
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

  @OnEvent('telegram.notification', { async: true })
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
