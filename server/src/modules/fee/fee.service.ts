import { Injectable } from '@nestjs/common';

export const { NOWNODES_API_KEY, BTC_EXPLORER, ETH_EXPLORER } = process.env;

@Injectable()
export class FeeService {
  EXCHANGE_FEE = 0.02;
  DEPOSIT_FEE = 0.02;
  WITHDRAWAL_FEE = 0.02;
  FEE_BLOCK_AMOUNT = 100; // USD
}
