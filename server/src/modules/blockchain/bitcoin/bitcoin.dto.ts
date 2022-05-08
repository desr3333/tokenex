import {
  CryptoWalletDto,
  CryptoWalletTransactionDto,
} from '@modules/crypto-wallet';

export class BitcoinWalletDto extends CryptoWalletDto {
  totalReceived: number;
  totalSent: number;
  txs: number;
  txids: string[];
}

export class BitcoinTransactionDto extends CryptoWalletTransactionDto {
  inputs?: number;
  outputs?: number;
}
