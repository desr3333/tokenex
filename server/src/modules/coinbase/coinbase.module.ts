import { CoinmarketModule } from '@modules/coin-market';
import { Module } from '@nestjs/common';

import { CoinbaseService } from './coinbase.service';

@Module({
  imports: [CoinmarketModule],
  controllers: [],
  providers: [CoinbaseService],
  exports: [CoinbaseService],
})
export class CoinbaseModule {}
