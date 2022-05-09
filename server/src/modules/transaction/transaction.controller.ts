import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

import { TransactionService } from './transaction.service';
import { TransactionDto } from './transaction.dto';

@ApiTags('Transaction')
@Controller('/transactions')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get()
  async find(@Res() res: Response) {
    const result = await this.transactionService.find({});
    if (!result) return res.status(404).json({ result: [] });

    return res.status(200).json({ result });
  }
}
