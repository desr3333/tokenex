import { Module } from '@nestjs/common';

import { USDTController } from './usdt.controller';
import { USDTService } from './usdt.service';

@Module({
  imports: [],
  controllers: [USDTController],
  providers: [USDTService],
})
export class USDTModule {}
