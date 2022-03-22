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

  @Post()
  async create(): Promise<any> {
    const result = await this.USDTService.create();
    if (!result) return { error: 'Account Not Created!' };

    return { result };
  }

  @Get('')
  async getInfo() {
    const result = await this.USDTService.getInfo();
    if (!result) return { error: 'Token USDT Not Found!' };

    return { result };
  }

  @Get(':address/balance')
  async getBalance(@Param() params) {
    const { address } = params;

    const result = await this.USDTService.getBalance(address);
    if (!result) return { error: 'Account Not Found!' };

    return { result };
  }
}
