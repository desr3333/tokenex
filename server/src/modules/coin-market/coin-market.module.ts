import { Module } from '@nestjs/common';

import { CoinMarketController } from './coin-market.controller';
import { CoinMarketService } from './coin-market.service';

@Module({
  imports: [],
  controllers: [CoinMarketController],
  providers: [CoinMarketService],
  exports: [CoinMarketService],
})
export class CoinMarketModule {}
