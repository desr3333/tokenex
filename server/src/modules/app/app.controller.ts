import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller('')
export class AppController {
  constructor(private appService: AppService) {}

  @Get('ping')
  async ping(@Res() res: Response) {
    return res.status(200).send();
  }

  @Post('test')
  async test(@Res() res: Response, @Body() body: any) {
    const result = await this.appService.test(body);
    return res.status(200).json({ result });
  }
}
