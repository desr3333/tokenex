import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('')
export class AppController {
  @Get('ping')
  async ping(@Res() res: Response) {
    return res.status(200).send();
  }
}
