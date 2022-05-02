import { Module } from '@nestjs/common';

import { CoinbaseModule } from '@modules/coinbase';
import { CryptoWalletModule } from '@modules/crypto-wallet';

import { ExchangeController } from './exchange.controller';
import { ExchangeService } from './exchange.service';

@Module({
  imports: [CoinbaseModule, CryptoWalletModule],
  controllers: [ExchangeController],
  providers: [ExchangeService],
  exports: [ExchangeService],
})
export class ExchangeModule {}
