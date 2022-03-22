import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';

import { USDTService } from './usdt.service';

@ApiTags('USDT')
@Controller('/usdt')
export class USDTController {
  constructor(private readonly USDTService: USDTService) {}

  @Get('')
  async getInfo() {
    const { symbol } = this.USDTService;

    const result = await this.USDTService.getInfo();
    if (!result) return { error: `Token ${symbol} Not Found!` };

    return { result };
  }

  @Post()
  async create() {
    const { symbol } = this.USDTService;

    const result = await this.USDTService.create();
    if (!result) return { error: `${symbol} Account Not Created!` };

    return { result };
  }

  @Get(':address/balance')
  async getBalance(@Param() params) {
    const { address } = params;
    const result = await this.USDTService.getBalance(address);

    return { result };
  }
}
