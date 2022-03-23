import { ApiProperty } from '@nestjs/swagger';

export class CreateBTCWalletDto {
  @ApiProperty()
  walletId: number;

  @ApiProperty({ default: 'BTC' })
  symbol?: string;
}
