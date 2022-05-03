export class ExplorerRequestDto {
  blockchain: 'bitcoin' | 'ethereum';
  address?: string;
  tx?: string;
}

export class ExplorerTransactionDto {
  txid: string;
  from: string;
  to: string;
  value: number;
  blockHash: string;
  blockHeight: number;
  confirmations: number;
}

export class BitcoinTransactionDto extends ExplorerTransactionDto {}
export class EthereumTransactionDto extends ExplorerTransactionDto {
  nonce: number;
  gas: number;
  gasUsed: number;
}

export class ExplorerServiceInterface {
  getAddress: (...args) => Promise<any>;
  getTransaction: (...args) => Promise<any>;
  watchAddress: (...args) => Promise<any>;
}
