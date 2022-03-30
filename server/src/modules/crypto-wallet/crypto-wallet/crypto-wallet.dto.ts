import { ApiProperty } from '@nestjs/swagger';

export class CreateCryptoWalletDto {
  @ApiProperty()
  address?: string;

  @ApiProperty()
  symbol: string;

  @ApiProperty({ default: 0 })
  balance?: number;

  @ApiProperty()
  walletId: number;

  @ApiProperty()
  tokenId: number;
}

// export class CreateMultipleCryptoWalletDto {
//   @ApiProperty()
//   walletId: number;
// }

export class CryptoWalletTransactionDto {}

export class CryptoWalletWithdrawalDto {
  @ApiProperty()
  value: number;

  @ApiProperty()
  from: string;

  @ApiProperty()
  to: string;
}

export class CryptoWalletDepositDto {
  @ApiProperty()
  value: number;

  @ApiProperty()
  from: string;

  @ApiProperty()
  to: string;
}

// CryptoWallet Builder

interface CryptoWalletServiceBuilderOptions {
  symbol: string;
}

export class CryptoWalletServiceBuilder {
  public symbol: string;

  constructor(options: CryptoWalletServiceBuilderOptions) {
    this.symbol = options?.symbol;
  }
}
