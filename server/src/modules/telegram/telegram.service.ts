import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

import { TelegramTextMessageDto } from './telegram.dto';

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
      const response = await this.fetch.post('sendMessage', data);
      if (!response) throw Error('Telegram Message Not Sent!');

      return data;
    } catch (e) {
      console.log({ e });
      return null;
    }
  }
}
