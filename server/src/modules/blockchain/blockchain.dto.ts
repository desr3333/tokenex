export class BlockchainServiceInterface {
  create?: (...args) => any;
  update?: (...args) => any;
  delete?: (...args) => any;

  getAddress?: (...args) => any;
  getBalance?: (...args) => any;
  signTransaction?: (...args) => any;
  sendTransaction?: (...args) => any;
  getTransactions?: (...args) => any[];

  calculateTx?: (...args) => any;
  calculateFee?: (...args) => any;
}
