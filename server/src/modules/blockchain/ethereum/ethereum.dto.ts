export class ETHTransactionDto {
  txid: string;
  nonce: number;
  from: string;
  to: string;
  value: number;
  blockHash: string;
  blockHeight: number;
  confirmations: number;
  gas: number;
  gasUsed: number;
}

export class ETHRawTransactionDto {
  value: number;
  from: string;
  to: string;
  privateKey?: string;
  gas?: number;
  nonce?: number;
  maxFeePerGas?: number;
  maxPriorityFeePerGas?: number;
}
