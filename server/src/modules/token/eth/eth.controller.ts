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

import { ETHService } from './eth.service';

@ApiTags('ETH')
@Controller('/eth')
export class ETHController {
  constructor(private readonly ethService: ETHService) {}

  @Post()
  async create(): Promise<any> {
    const result = await this.ethService.create();
    if (!result) return { error: 'Account Not Created!' };

    return { result };
  }

  @ApiParam({
    name: 'address',
    required: true,
    type: 'string',
  })
  @Get(':address/balance')
  async getBalance(@Param() params) {
    const { address } = params;
    const result = await this.ethService.getBalance(address);

    return { result };
  }
}
