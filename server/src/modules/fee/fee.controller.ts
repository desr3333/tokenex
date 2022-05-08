import { Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { FeeService } from './fee.service';

@Controller('fee')
export class FeeController {
  constructor(private fee: FeeService) {}

  @Get(':blockchain/address/:address')
  async getAddress(@Res() res: Response, @Param() params) {
    return;
  }
}
