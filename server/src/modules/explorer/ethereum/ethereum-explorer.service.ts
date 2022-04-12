import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

import { EthereumService } from '@modules/blockchain/ethereum';
import { ETHTransactionDto } from './ethereum-explorer.dto';
import { ExplorerServiceInterface } from '../explorer.dto';

export const { NOWNODES_API_KEY, BTC_EXPLORER, ETH_EXPLORER } = process.env;

@Injectable()
export class EthereumExplorerService implements ExplorerServiceInterface {
  private fetch: AxiosInstance;

  constructor(private EthereumService: EthereumService) {
    this.fetch = axios.create({
      baseURL: `${ETH_EXPLORER}/`,
      headers: {
        'api-key': NOWNODES_API_KEY,
      },
    });
  }

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

  async watchAddress(address: string): Promise<string> {
    try {
      const { web3 } = this.EthereumService;

      setInterval(async () => {
        // Checking Block
        const blockNumber = await web3.eth.getBlockNumber();
        const block = await web3.eth.getBlock(blockNumber);

        const isBlockValid = block && block.transactions;
        if (!isBlockValid) return;

        console.log({ blockNumber, address });

        // Checking Transactions
        if (block.transactions?.length >= 0) {
          block.transactions?.map(async (tx) => {
            const transaction = await this.getTransaction(tx);
            if (transaction?.to !== address) return;

            console.log({ transaction });
          });
        }
      }, 5000);
    } catch (e) {
      console.log({ e });
      return null;
    }
  }
}
