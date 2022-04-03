export class WalletDto {
  id: number;
  account: any;
  cryptoWallets?: any[];
  createdAt?: Date;
  updatedAt?: Date;
}

export class TransactionDto {
  from?: string;
  to?: string;
  value?: number;
  cryptoWallet?: CryptoWalletDto;
  explorerLink?: string;
}

export class CryptoWalletDto {
  address?: string;
  balance?: number;
  symbol?: string;
  feeAddress?: string;
  depositFee?: number;
  withdrawFee?: number;
  raindropFee?: number;
}

export class TokenDto {}
