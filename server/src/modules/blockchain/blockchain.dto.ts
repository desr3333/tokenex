export class BlockchainServiceInterface {
  create: (...args) => any;
  getAddress: (...args) => any;
  getBalance: (...args) => any;
  sendTransaction: (...args) => any;

  calculateTx: (...args) => any;
  calculateGas: (...args) => any;

  update?: (...args) => any;
  delete?: (...args) => any;
  getTransactions?: (...args) => any[];
  calculateFee?: (...args) => any;
}
