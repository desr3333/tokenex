import { Injectable, OnModuleInit } from '@nestjs/common';

import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { Contract } from 'web3-eth-contract';

import ERC20_ABI from './erc20-abi.json';
import { ERC20TransferDto } from './erc20.dto';

interface ERC20ServiceParams {
  contractAddress: string;
  abi?: any; // AbiItem | AbiItem[];
}

@Injectable()
export class ERC20Service implements OnModuleInit {
  public web3: Web3;
  public contract: Contract;
  public contractAddress: string;

  public name: string;
  public symbol: string;
  public totalSupply: number;

  constructor(params: ERC20ServiceParams) {
    const { ERC20_NODE_API_KEY, ERC20_NODE_PROVIDER } = process.env;

    const contractAddress = params?.contractAddress || '';
    const contractABI = params?.abi || (ERC20_ABI as AbiItem[]);

    this.web3 = new Web3(`${ERC20_NODE_PROVIDER}/${ERC20_NODE_API_KEY}`);
    this.contract = new this.web3.eth.Contract(contractABI, contractAddress);
    this.contractAddress = contractAddress;
  }

  async onModuleInit() {
    await this.getInfo();
  }

  async create() {
    try {
      const result = await this.web3.eth.accounts.create();
      return result;
    } catch (e) {
      console.log({ e });
      return null;
    }
  }

  async getInfo() {
    try {
      if (!this.symbol) {
        this.name = await this.contract.methods.name().call();
        this.symbol = await this.contract.methods.symbol().call();
        this.totalSupply = await this.contract.methods.totalSupply().call();
      }

      const { name, symbol, totalSupply } = this;

      return { name, symbol, totalSupply };
    } catch (e) {
      console.log({ e });
      return null;
    }
  }

  async getBalance(address: string): Promise<number> {
    try {
      const wei = await this.contract.methods.balanceOf(address).call();
      const balance = Number(this.web3.utils.fromWei(wei));

      return balance;
    } catch (e) {
      console.log({ e });
      return null;
    }
  }

  async transfer({ from, to, value }: ERC20TransferDto) {
    try {
      // const transferFrom = await this.contract.methods
      //   .transferFrom(from, to, value)
      //   .call();

      const transfer = await this.contract.methods.getOwner().call(); //.increase(10000);

      // .send({ from, gasPrice: '0xFF', gasLimit: '0x24A22' });

      // const transfer = await this.contract.methods
      //   .transferFrom(from, to, value)
      //   .send();
      // // .send({
      // //   from,
      // //   gas: 50000,
      // //   gasPrice: 1e6,
      // // });

      console.log({ transfer });
    } catch (e) {
      console.log('transfer failed!');
      console.log({ e });
      return null;
    }
  }

  async sendTransaction() {
    return;
  }
}
