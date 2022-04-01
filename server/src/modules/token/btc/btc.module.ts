import { Module } from '@nestjs/common';

import { BTCService } from './btc.service';

@Module({
  imports: [],
  providers: [BTCService],
  exports: [BTCService],
})
export class BTCModule {}
