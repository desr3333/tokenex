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
  tokenId?: number;
}

export class UpdateCryptoWalletDto {
  @ApiProperty()
  address?: string;

  @ApiProperty()
  symbol?: string;

  @ApiProperty()
  balance?: number;

  @ApiProperty()
  walletId?: number;

  @ApiProperty()
  tokenId?: number;
}

export class CryptoWalletTransactionDto {
  from: string;
  to: string;
  value: number;
  tx?: string;
  explorerLink?: string;
  gas?: number;
  output?: number;
}

export class CryptoWalletTransferDto {
  @ApiProperty()
  from: string;

  @ApiProperty()
  to: string;

  @ApiProperty()
  value: number;
}

export class CryptoWalletWithdrawDto extends CryptoWalletTransferDto {}
export class CryptoWalletDepositDto extends CryptoWalletTransferDto {}

export class CryptoWalletKeyPair {
  address: string;
  privateKey: string;
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
