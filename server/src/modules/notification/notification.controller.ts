import { TelegramService } from '@modules/telegram';
import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NotificationDto, TelegramNotificationDto } from './notification.dto';
import { NotificationService } from './notification.service';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Post('telegram')
  async sendNotification(@Res() res, @Body() data: TelegramNotificationDto) {
    try {
      const result = await this.notificationService.sendTelegramNotification(
        data,
      );
      if (!result)
        return res
          .status(400)
          .json({ error: `Telegram Notification Not Sent!` });

      return res.status(200).json({ result });
    } catch (e) {
      console.log({ e });
    }
  }
}
