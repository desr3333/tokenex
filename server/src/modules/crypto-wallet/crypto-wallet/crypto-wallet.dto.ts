import { ApiProperty } from '@nestjs/swagger';

export class CryptoWalletDto {
  // public symbol: string;
  // constructor(params: CryptoWalletServiceParams) {
  //   this.symbol = params?.symbol;
  // }
}

export class CreateCryptoWalletDto {
  @ApiProperty()
  address: string;

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
