import { Module } from '@nestjs/common';

import { AccountModule } from './../account';

@Module({
  imports: [AccountModule],
})
export class AppModule {}
