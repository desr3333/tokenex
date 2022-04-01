import { Module } from '@nestjs/common';

import { ETHService } from './eth.service';

@Module({
  imports: [],
  providers: [ETHService],
  exports: [ETHService],
})
export class ETHModule {}
