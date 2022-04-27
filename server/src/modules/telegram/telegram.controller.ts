import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { TelegramTextMessageDto } from './telegram.dto';

import { TelegramService } from './telegram.service';

@Controller('telegram')
export class TelegramController {
  constructor(private telegramService: TelegramService) {}

  @Post('messages')
  async sendMessage(
    @Res() res: Response,
    @Body() messageDto: TelegramTextMessageDto,
  ) {
    const result = await this.telegramService.sendMessage(messageDto);
    if (!result)
      return res.status(400).json({ error: 'Telegram Message Not Sent!' });

    return res.status(200).json({ result });
  }
}
