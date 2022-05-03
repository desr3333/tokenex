import { Injectable } from '@nestjs/common';
import axios from 'axios';

import { EthereumService } from '@modules/blockchain/ethereum';
import { NotificationService } from '@modules/notification';

import { ETHTransactionDto } from './ethereum-explorer.dto';
import { ExplorerServiceInterface } from '../explorer.dto';

export const {
  ETH_NET,
  ETH_EXPLORER_MAINNET,
  ETH_EXPLORER_TESTNET,
  ETH_NODE_API_KEY,
} = process.env;

@Injectable()
export class EthereumExplorerService implements ExplorerServiceInterface {
  constructor(private ethereumService: EthereumService) {}

  EXPLORER =
    ETH_NET === 'mainnet' ? ETH_EXPLORER_MAINNET : ETH_EXPLORER_TESTNET;

  fetch = axios.create({
    baseURL: `${this.EXPLORER}/`,
    headers: {
      'api-key': ETH_NODE_API_KEY,
    },
  });

  async getAddress(address: string) {
    try {
      const response = await this.fetch.get(`address/${address}`);
      return response.data;
    } catch (e) {
      console.log([e]);
      return null;
    }
  }

  async getTransaction(tx: string): Promise<ETHTransactionDto> {
    try {
      const response = await this.fetch(`tx/${tx}`);
      const data = response.data;

      const { txid, blockHash, blockHeight, confirmations } = data;
      const { gas, gasUsed, nonce } = data?.ethereumSpecific;
      const value = Number(data?.value);
      const from = data?.vin?.[0]?.addresses?.[0];
      const to = data?.vout?.[0]?.addresses?.[0];

      const result: ETHTransactionDto = {
        txid,
        from,
        to,
        value,
        nonce,
        gas,
        gasUsed,
        blockHash,
        blockHeight,
        confirmations,
      };

      return result;
    } catch (e) {
      console.log({ e });
      return null;
    }
  }

  async watchAddress(
    address: string,
    callback?: (data: any) => void,
  ): Promise<string> {
    try {
      const { web3 } = this.ethereumService;

      console.log('Started watching..');

      const interval = setInterval(async () => {
        // Checking Block
        const blockNumber = await web3.eth.getBlockNumber();
        const block = await web3.eth.getBlock(blockNumber);
        const isBlockValid = block && block.transactions;
        if (!isBlockValid) return;

        console.log({ timestamp: Date.now(), blockNumber, address });

        // Checking Transactions
        if (block.transactions?.length >= 0) {
          block.transactions?.map(async (tx) => {
            const transaction = await this.getTransaction(tx);
            if (transaction?.to !== address) return;

            console.log({ transaction });

            if (callback) callback(transaction);

            clearInterval(interval);
          });
        }
      }, 10000);
    } catch (e) {
      console.log({ e });
      return null;
    }
  }
}
