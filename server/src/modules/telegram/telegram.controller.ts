import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { TelegramTextMessageDto } from './telegram.dto';

import { TelegramService } from './telegram.service';

@Controller('telegram')
export class TelegramController {
  constructor(private telegramService: TelegramService) {}

  @Post('sendMessage')
  async sendMessage(
    @Res() res: Response,
    @Body() messageDto: TelegramTextMessageDto,
  ) {
    const result = await this.telegramService.sendMessage(messageDto);
    if (!result)
      return res.status(400).json({ error: 'Message Not Sent To The Bot!' });

    return res.status(200).json({ result });
  }
}
