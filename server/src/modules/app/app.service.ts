import { Injectable } from '@nestjs/common';
import { NotificationService } from '@modules/notification';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class AppService {
  constructor(private notificationService: NotificationService) {}

  // @Cron('*/5 * * * * *')
  async test(data: any) {
    try {
      const result = {};
      return result;
    } catch (e) {
      console.log({ e });
    }
  }
}
