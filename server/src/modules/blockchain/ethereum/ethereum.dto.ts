import {
  CryptoWalletDto,
  CryptoWalletTransactionDto,
} from '@modules/crypto-wallet';

export class EthereumWalletDto extends CryptoWalletDto {}

export class EthereumTransactionDto extends CryptoWalletTransactionDto {
  txid: string;
  nonce: number;
  blockHash: string;
  blockHeight: number;
  confirmations: number;
  gas: number;
  gasUsed: number;
}

export class EthereumTransactionConfigDto {
  privateKey?: string;
  from?: string;
  to?: string;
  value?: number;
  gas?: number;
  gasPrice?: number;
  maxPriorityFeePerGas?: number;
  maxFeePerGas?: number;
  data?: string;
  nonce?: number;
  chainId?: number;
  chain?: string;
  hardfork?: string;
}
