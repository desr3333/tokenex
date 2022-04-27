import { TelegramService } from '@modules/telegram';
import { Injectable } from '@nestjs/common';
import { NotificationDto, TelegramNotificationDto } from './notification.dto';

@Injectable()
export class NotificationService {
  constructor(private telegramService: TelegramService) {}

  async sendTelegramNotification(
    dto: TelegramNotificationDto,
  ): Promise<TelegramNotificationDto> {
    try {
      const result = await this.telegramService.sendNotification(dto);
      if (!result) throw Error(`Telegram Notication Not Sent!`);

      return result;
    } catch (e) {
      console.log({ e });
      return null;
    }
  }

  // TODO
  async sendDiscordNotification() {
    return;
  }
}
