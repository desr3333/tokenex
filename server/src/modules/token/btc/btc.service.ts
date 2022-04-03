import {
  CryptoWalletKeyPair,
  CryptoWalletTransactionDto,
} from '@modules/crypto-wallet';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import bitcore, { Address, Transaction } from 'bitcore-lib';

import * as bip32 from 'bip32';
import * as bip39 from 'bip39';

import { TokenServiceInterface } from './../token';
import { BTCTransactionDto, BTCWalletDto } from './btc.dto';

@Injectable()
export class BTCService implements TokenServiceInterface {
  NODE_API_KEY = process.env.BTC_NODE_API_KEY;
  NODE_PROVIDER = process.env.BTC_NODE_PROVIDER;
  EXPLORER = process.env.BTC_EXPLORER;
  NETWORK = bitcore.Networks.testnet;

  TESTNET_EXPLORER = 'https://www.blockchain.com/btc-testnet';

  GAS = 500;

  axios = axios.create({
    headers: {
      'api-key': this.NODE_API_KEY,
    },
  });

  toSatoshis(btc: number) {
    return bitcore.Unit.fromBTC(Number(btc)).toSatoshis();
  }

  toBTC(satoshis: number) {
    return bitcore.Unit.fromSatoshis(Number(satoshis)).toBTC();
  }

  async create(): Promise<CryptoWalletKeyPair> {
    const pk = new bitcore.PrivateKey(null, this.NETWORK);

    const privateKey = pk.toString();
    const address = pk.toAddress().toString();

    const result = { address, privateKey };
    return result;
  }

  async get(address: string): Promise<BTCWalletDto> {
    try {
      const response = await this.axios.get(
        `${this.EXPLORER}/address/${address}`,
      );
      if (!response) throw Error('BTC Balance Not Fetched!');

      const { balance, txs, txids, totalReceived, totalSent } = response.data;

      const result = {
        address,
        balance: this.toBTC(balance),
        totalReceived: Number(totalReceived) || 0,
        totalSent: Number(totalSent) || 0,
        txs: Number(txs) || 0,
        txids: txids || [],
      };

      return result;
    } catch (e) {
      console.log({ e });
    }
  }

  async getBalance(address: string): Promise<number> {
    try {
      const result = await this.get(address);
      if (!result) throw Error('BTC Balance Not Fetched!');

      return result.balance;
    } catch (e) {
      console.log({ e });
    }
  }

  async getUtxo({
    address,
    satoshis,
  }: {
    address: string;
    satoshis: number;
  }): Promise<Transaction.UnspentOutput[]> {
    try {
      const response = await this.axios.get(`${this.EXPLORER}/utxo/${address}`);
      const utxos = response.data;

      const selectMinUtxo = (
        utxos: Transaction.UnspentOutput[],
        satoshis: number,
      ): Transaction.UnspentOutput => {
        const sortedUtxos =
          utxos
            ?.filter((u) => u.satoshis >= satoshis)
            ?.sort((a, b) => a.satoshis - b.satoshis) || [];

        return sortedUtxos[0];
      };

      const utxo = utxos?.map(
        (e) =>
          new bitcore.Transaction.UnspentOutput({
            txId: e.txid,
            outputIndex: e.vout,
            address,
            script: bitcore.Script.buildPublicKeyHashOut(
              new bitcore.Address(address),
            ).toString(),
            satoshis: Number(e.value),
          }),
      );

      // const result = selectMinUtxo(unspents, satoshis);
      return utxo;
    } catch (e) {
      console.log({ e });
    }
  }

  async getRawTransaction(txid: string) {
    try {
      const { axios, NODE_PROVIDER, NODE_API_KEY } = this;

      axios.defaults.baseURL = NODE_PROVIDER;

      const response = await this.axios.post('', {
        API_key: NODE_API_KEY,
        jsonrpc: '2.0',
        id: 'test',
        method: 'getrawtransaction',
        params: [txid, true],
      });
      if (!response) throw Error('BTC Utxo Not Fetched!');

      const result = response.data;
      return result;
    } catch (e) {
      console.log({ e });
    }
  }

  async sendTransaction({
    value,
    from,
    to,
    privateKey,
  }: BTCTransactionDto): Promise<CryptoWalletTransactionDto> {
    try {
      const wallet = await this.get(from);
      if (!wallet) return null;

      const address = from;
      const satoshis = this.toSatoshis(value);
      const fee = this.calculateGas(value);
      const amount = satoshis;
      const gas = this.toBTC(fee);

      const utxo = await this.getUtxo({ address, satoshis });

      const signedTx = new bitcore.Transaction()
        .from(utxo)
        .to(to, amount)
        .fee(fee)
        .change(address)
        .sign(privateKey);

      if (!signedTx) throw Error(`Transaction Not Signed!`);

      const signedhex = signedTx.serialize();

      // Sending
      const sentTx = await this.axios.post(this.NODE_PROVIDER, {
        API_key: this.NODE_API_KEY,
        jsonrpc: '2.0',
        id: 'test',
        method: 'sendrawtransaction',
        params: [signedhex],
      });

      const tx = sentTx.data.result;
      const explorerLink = this.generateExplorerLink(tx);

      const result = {
        from,
        to,
        tx,
        gas,
        value: this.toBTC(amount),
        explorerLink,
      };

      return result;
    } catch (e) {
      console.log({ e });
      console.log(e?.response?.data);
    }
  }

  async calculateTx({
    value,
    from,
    to,
  }: BTCTransactionDto): Promise<CryptoWalletTransactionDto> {
    try {
      const balance = await this.getBalance(from);
      const satoshis = this.toSatoshis(value);
      const gas = await this.calculateGas(value);

      const input = this.toSatoshis(balance);
      const output = this.toBTC(satoshis + gas);

      const result = {
        value,
        from,
        to,
        gas,
        output,
      };

      return result;
    } catch (e) {
      console.log({ e });
      return null;
    }
  }

  calculateGas(value: number) {
    try {
      const satoshis = this.toSatoshis(value);
      const result = satoshis * 0.025;
      return result;
    } catch (e) {
      console.log({ e });
    }
  }

  generateExplorerLink(tx: string) {
    return `${this.TESTNET_EXPLORER}/tx/${tx}`;
  }
}
