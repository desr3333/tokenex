import { ApiProperty } from '@nestjs/swagger';

export class CreateUSDTWalletDto {
  @ApiProperty()
  walletId: number;

  @ApiProperty({ default: 'USDT' })
  symbol?: string;
}
