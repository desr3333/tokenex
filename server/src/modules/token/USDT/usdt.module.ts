import { Module } from '@nestjs/common';

import { USDTService } from './usdt.service';

@Module({
  imports: [],
  providers: [USDTService],
  exports: [USDTService],
})
export class USDTModule {}
