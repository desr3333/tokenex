import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TelegramNotificationDto } from './notification.dto';

@Injectable()
export class NotificationService {
  constructor(private eventService: EventEmitter2) {}

  async sendTelegramNotification(
    data: TelegramNotificationDto,
  ): Promise<TelegramNotificationDto> {
    try {
      const event = this.eventService.emit('telegram.notification', data);
      if (!event) return null;

      return data;
    } catch (e) {
      console.log({ e });
      return null;
    }
  }
}
