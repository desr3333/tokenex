import { Module } from '@nestjs/common';

import { BTCController } from './btc.controller';
import { BTCService } from './btc.service';

@Module({
  imports: [],
  controllers: [BTCController],
  providers: [BTCService],
})
export class BTCModule {}
