import { Controller, Post } from '@nestjs/common';

@Controller('notifications')
export class NotificationController {
  // TODO
  @Post('')
  async sendNotification() {
    return;
  }
}
