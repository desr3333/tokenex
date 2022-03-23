import { ApiProperty } from '@nestjs/swagger';

export class CreateCryptoWalletDto {
  @ApiProperty()
  address: string;

  @ApiProperty()
  symbol: string;

  @ApiProperty({ default: 0 })
  balance?: number;

  @ApiProperty()
  walletId: number;

  @ApiProperty()
  tokenId: number;
}

export class CreateMultipleCryptoWalletDto {
  @ApiProperty()
  walletId: number;
}
