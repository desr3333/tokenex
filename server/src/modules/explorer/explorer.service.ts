import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

import { EthereumService } from '@modules/blockchain/ethereum';
import { NotificationService } from '@modules/notification';

import { ExplorerRequestDto, ExplorerServiceInterface } from './explorer.dto';
import { EthereumExplorerService } from './ethereum';
import { BitcoinExplorerService } from './bitcoin';

export const { NOWNODES_API_KEY, BTC_EXPLORER, ETH_EXPLORER } = process.env;

@Injectable()
export class ExplorerService implements ExplorerServiceInterface {
  constructor(
    private notificationService: NotificationService,
    private ethereumExplorerService: EthereumExplorerService,
    private bitcoinExplorerService: BitcoinExplorerService,
  ) {}

  async getAddress({ blockchain, address }: ExplorerRequestDto) {
    try {
      switch (blockchain) {
        case 'bitcoin':
          return this.bitcoinExplorerService.getAddress(address);
        case 'ethereum':
          return this.ethereumExplorerService.getAddress(address);
        default:
          return null;
      }
    } catch (e) {
      console.log([e]);
      return null;
    }
  }

  async getTransaction({ blockchain, tx }: ExplorerRequestDto) {
    try {
      switch (blockchain) {
        case 'bitcoin':
          return this.bitcoinExplorerService.getTransaction(tx);
        case 'ethereum':
          return this.ethereumExplorerService.getTransaction(tx);
        default:
          return null;
      }
    } catch (e) {
      console.log({ e });
      return null;
    }
  }

  async watchAddress({
    blockchain,
    address,
  }: ExplorerRequestDto): Promise<string> {
    try {
      switch (blockchain) {
        case 'bitcoin':
          // return this.bitcoinExplorerService.watchAddress(address,(payload) => {},);
          return;
        case 'ethereum':
          return this.ethereumExplorerService.watchAddress(
            address,
            (payload) => {
              console.log('Transaction Found!');
            },
          );
        default:
          return null;
      }
    } catch (e) {
      console.log({ e });
      return null;
    }
  }
}
