import { Module } from '@nestjs/common';

import { AccountModule } from './../account';
import { WalletModule } from './../wallet';

@Module({
  imports: [AccountModule, WalletModule],
})
export class AppModule {}
