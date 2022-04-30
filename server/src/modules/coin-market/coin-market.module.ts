import { Module } from '@nestjs/common';

import { CoinmarketController } from './coin-market.controller';
import { CoinmarketService } from './coin-market.service';

@Module({
  imports: [],
  controllers: [CoinmarketController],
  providers: [CoinmarketService],
  exports: [CoinmarketService],
})
export class CoinmarketModule {}
