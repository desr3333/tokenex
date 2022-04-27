import { TelegramService } from '@modules/telegram';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
  constructor(private telegramService: TelegramService) {}

  // TODO
}
