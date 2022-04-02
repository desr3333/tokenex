export class BTCTransactionDto {
  value: number;
  from?: string;
  to: string;
  privateKey?: string;
}

export class BTCWalletDto {
  address: string;
  balance: number;
  totalReceived: number;
  totalSent: number;
  txs: number;
  txids: string[];
}
