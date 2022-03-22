import { Module } from '@nestjs/common';

import { ETHController } from './eth.controller';
import { ETHService } from './eth.service';

@Module({
  imports: [],
  controllers: [ETHController],
  providers: [ETHService],
})
export class ETHModule {}
