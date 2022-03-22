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

import { BTCService } from './btc.service';

@ApiTags('BTC')
@Controller('/btc')
export class BTCController {
  constructor(private readonly btcService: BTCService) {}
}
