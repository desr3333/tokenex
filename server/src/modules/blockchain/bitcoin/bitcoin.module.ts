import { Module } from '@nestjs/common';

import { BitcoinService } from './bitcoin.service';

@Module({
  imports: [],
  providers: [BitcoinService],
  exports: [BitcoinService],
})
export class BTCModule {}
