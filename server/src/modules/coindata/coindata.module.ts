import { Module } from '@nestjs/common';

import { CoindataController } from './coindata.controller';
import { CoindataService } from './coindata.service';

@Module({
  imports: [],
  controllers: [CoindataController],
  providers: [CoindataService],
  exports: [CoindataService],
})
export class CoindataModule {}
