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
}

export class CryptoWalletDto {
  address?: string;
  balance?: number;
  symbol?: string;
}
