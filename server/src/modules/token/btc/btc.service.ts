import {
  CryptoWalletKeyPair,
  CryptoWalletTransactionDto,
} from '@modules/crypto-wallet';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import bitcore, { Address } from 'bitcore-lib';

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

  axios = axios.create({
    headers: {
      'api-key': this.NODE_API_KEY,
    },
  });

  toSatoshis(btc: number) {
    return btc ? Math.floor(btc * 100000000) : 0;
  }

  fromSatoshis(satoshis: number) {
    return satoshis ? satoshis / 100000000 : 0;
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
        balance: Number(balance) || 0,
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

      const balance = result.balance;
      return balance;
    } catch (e) {
      console.log({ e });
    }
  }

  async getUtxo(address: string): Promise<bitcore.Transaction.UnspentOutput[]> {
    try {
      const response = await this.axios.get(`${this.EXPLORER}/utxo/${address}`);
      const utxos = response.data;

      const result = utxos?.map(
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

      return result;
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

      const utxo = await this.getUtxo(from);
      const satoshis = bitcore.Unit.fromBTC(value).toSatoshis();
      const fee = 5000;
      const amount = satoshis - fee;
      const gas = bitcore.Unit.fromSatoshis(fee).toBTC();

      const signedTx = new bitcore.Transaction()
        .from(utxo)
        .to(to, amount)
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

      const result = {
        from,
        to,
        value,
        tx,
        gas,
      };

      return result;
    } catch (e) {
      console.log({ e });
    }
  }
}
