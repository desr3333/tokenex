import { CryptoWallet, ServiceFee } from '@prisma/client';

export class TransactionDto {
  id?: string;
  status?: string;
  value: number;
  from: string;
  to: string;
  hash?: string;
  fee?: number;
  serviceFee?: ServiceFee;
  serviceFeeId: string;
  cryptoWallet?: CryptoWallet;
  cryptoWalletId?: string;
  explorerLink?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
