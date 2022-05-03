import { Injectable } from '@nestjs/common';
import { NotificationService } from '@modules/notification';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class AppService {
  constructor(private notificationService: NotificationService) {}

  // @Cron('*/5 * * * * *')
  async test(data: any) {
    try {
      this.notificationService.sendTelegramNotification({
        chat_id: 193459222,
        type: 'TRANSACTION_CONFIRMED',
        payload: { data: Date.now() },
      });

      const result = {};
      return result;
    } catch (e) {
      console.log({ e });
    }
  }
}
