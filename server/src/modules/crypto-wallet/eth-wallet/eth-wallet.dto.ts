import { ApiProperty } from '@nestjs/swagger';

export class CreateETHWalletDto {
  @ApiProperty()
  walletId: number;

  @ApiProperty({ default: 'ETH' })
  symbol?: string;
}

export class ETHWalletTransactionDto {
  @ApiProperty()
  value: number;

  @ApiProperty({ default: '0x' })
  to: string;
}
