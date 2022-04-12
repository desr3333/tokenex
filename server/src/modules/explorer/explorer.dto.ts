export class ExplorerTransactionDto {
  txid: string;
  from: string;
  to: string;
  value: number;
  blockHash: string;
  blockHeight: number;
  confirmations: number;
}

export class BTCTransactionDto extends ExplorerTransactionDto {}

export class ETHTransactionDto extends ExplorerTransactionDto {
  nonce: number;
  gas: number;
  gasUsed: number;
}

export class ExplorerServiceInterface {
  getAddress: (...args) => Promise<any>;
  getTransaction: (...args) => Promise<any>;
  watchAddress: (...args) => Promise<any>;
}
