export class CreateCryptoWalletDto {
  address?: string;
  symbol: string;
  balance?: number;
  walletId: string;
  tokenId?: string;
}

export class UpdateCryptoWalletDto {
  address?: string;
  symbol?: string;
  balance?: number;
  walletId?: string;
  tokenId?: string;
}

export class CryptoWalletDto {
  address: string;
  balance: number;
}

export class CryptoWalletTransactionDto {
  from: string;
  to: string;
  value: number;
  privateKey?: string;
  chain?: string;
  tx?: string;
  nonce?: number;
  gas?: number;
  explorerLink?: string;
  fee?: number;
  serviceFee?: number;
  input?: number;
  output?: number;
}

export class CryptoWalletTransferDto {
  from: string;
  to: string;
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
