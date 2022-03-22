import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { Contract } from 'web3-eth-contract';

import ERC20_ABI from './erc20.abi.json';

interface ERC20ServiceParams {
  contractAddress: string;
}

export class ERC20Service {
  public web3: Web3;
  public contract: Contract;
  public contractAddress: string;

  constructor(params: ERC20ServiceParams) {
    const { ERC20_NODE_API_KEY, ERC20_NODE_PROVIDER } = process.env;

    const contractAddress = params?.contractAddress || '';
    const contractABI = ERC20_ABI as AbiItem[];

    this.web3 = new Web3(`${ERC20_NODE_PROVIDER}/${ERC20_NODE_API_KEY}`);
    this.contract = new this.web3.eth.Contract(contractABI, contractAddress);
    this.contractAddress = contractAddress;
  }

  async getInfo() {
    const name = await this.contract.methods.name().call();
    const symbol = await this.contract.methods.symbol().call();

    return { name, symbol };
  }

  async getBalance(address: string): Promise<any> {
    try {
      const balance = await this.contract.methods.balanceOf(address).call();
      const decimals = await this.contract.methods.decimals(address).call();

      return { balance, decimals };
    } catch (e) {
      console.log({ e });
      return null;
    }
  }
}
