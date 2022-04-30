import { Module } from '@nestjs/common';

import { CoinbaseService } from './coinbase.service';

@Module({
  imports: [],
  controllers: [],
  providers: [CoinbaseService],
  exports: [CoinbaseService],
})
export class CoinbaseModule {}
