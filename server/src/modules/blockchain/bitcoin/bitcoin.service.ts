import {
  CryptoWalletKeyPair,
  CryptoWalletTransactionDto,
} from '@modules/crypto-wallet';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import bitcore, { Address, Transaction } from 'bitcore-lib';

import { BlockchainServiceInterface } from '../blockchain.dto';
import { BTCTransactionDto, BTCWalletDto } from './bitcoin.dto';

const {
  BTC_NODE_API_KEY,
  BTC_NODE_MAINNET,
  BTC_NODE_TESTNET,
  BTC_EXPLORER_MAINNET,
  BTC_EXPLORER_TESTNET,
  BTC_NET,
  BTC_EXPLORER_PUBLIC_MAINNET,
  BTC_EXPLORER_PUBLIC_TESTNET,
} = process.env;

@Injectable()
export class BitcoinService implements BlockchainServiceInterface {
  NET = bitcore.Networks[BTC_NET || 'testnet'];
  NODE_API_KEY = BTC_NODE_API_KEY;
  NODE = BTC_NET === 'mainnet' ? BTC_NODE_MAINNET : BTC_NODE_TESTNET;
  EXPLORER =
    BTC_NET === 'mainnet' ? BTC_EXPLORER_MAINNET : BTC_EXPLORER_TESTNET;
  EXPLORER_PUBLIC =
    BTC_NET === 'mainnet'
      ? BTC_EXPLORER_PUBLIC_MAINNET
      : BTC_EXPLORER_PUBLIC_TESTNET;

  FEE = 0.02;

  node = axios.create({
    baseURL: `${this.NODE}/`,
    headers: { 'api-key': this.NODE_API_KEY },
  });

  explorer = axios.create({
    baseURL: `${this.EXPLORER}/`,
    headers: { 'api-key': this.NODE_API_KEY },
  });

  toSatoshis(btc: number) {
    return bitcore.Unit.fromBTC(Number(btc)).toSatoshis();
  }

  toBTC(satoshis: number) {
    return bitcore.Unit.fromSatoshis(Number(satoshis)).toBTC();
  }

  async create(): Promise<CryptoWalletKeyPair> {
    const pk = new bitcore.PrivateKey(null, this.NET);

    const privateKey = pk.toString();
    const address = pk.toAddress().toString();

    const result = { address, privateKey };
    return result;
  }

  async getAddress(address: string): Promise<BTCWalletDto> {
    try {
      const response = await this.explorer.get(`address/${address}`);
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
      const result = await this.getAddress(address);
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
      const response = await this.explorer.get(`utxo/${address}`);
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
      const { NODE_API_KEY } = this;

      const response = await this.node.post('', {
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

  async signTransaction(
    transactionDto: CryptoWalletTransactionDto,
    privateKey: string,
  ) {
    try {
      const { value, from, to, gas, serviceFee } = transactionDto;

      const utxo = await this.getUtxo({
        address: from,
        satoshis: value,
      });

      const signedTx = new bitcore.Transaction()
        .from(utxo)
        .to(to, value)
        .to(to, this.toSatoshis(serviceFee))
        .fee(gas)
        .change(from)
        .sign(privateKey);

      console.log({ signedTx });

      return signedTx.serialize();
    } catch (e) {
      console.log({ e });
      return null;
    }
  }

  async sendTransaction(
    data: BTCTransactionDto,
  ): Promise<CryptoWalletTransactionDto> {
    try {
      const { from, to, privateKey } = data;

      const wallet = await this.getAddress(from);
      if (!wallet) return null;

      // Calculating
      const calculatedTx = await this.calculateTx({
        from,
        to,
        value: data.value,
      });
      console.log({ calculatedTx });

      const { value, fee, gas, serviceFee, input, output } = calculatedTx;

      // Signing
      const signedTx = await this.signTransaction(calculatedTx, privateKey);
      console.log({ signedTx });

      // Sending
      const sentTx = await this.node.post('', {
        API_key: this.NODE_API_KEY,
        jsonrpc: '2.0',
        id: 'test',
        method: 'sendrawtransaction',
        params: [signedTx],
      });

      const tx = sentTx.data.result;
      const explorerLink = this.generateExplorerLink(tx);

      const result = {
        value,
        from,
        to,
        tx,
        gas,
        fee,
        serviceFee,
        input,
        output,
        explorerLink,
      };

      return result;
    } catch (e) {
      console.log({ e });
      console.log(e?.response?.data);
    }
  }

  async calculateTx(
    data: BTCTransactionDto,
  ): Promise<CryptoWalletTransactionDto> {
    try {
      const { from, to } = data;

      const value = this.toSatoshis(data.value);
      const gas = this.calculateGas(data.value);
      const serviceFee = this.toFixed(data.value * this.FEE, 9);
      const fee = this.toBTC(gas);
      const input = this.toFixed(data.value + fee + serviceFee, 9);
      const output = this.toFixed(data.value, 9);

      const result = {
        value,
        from,
        to,
        gas,
        fee,
        serviceFee,
        input,
        output,
      };

      return result;
    } catch (e) {
      console.log({ e });
      return null;
    }
  }

  async getLatestBlock() {
    try {
      const response = await this.explorer.get('block/703052');
      const result = response?.data?.height;
      return result;
    } catch (e) {
      console.log({ e });
    }
  }

  calculateGas(value: number) {
    try {
      const satoshis = this.toSatoshis(value);
      const result = Math.floor(satoshis * 0.05);
      return result;
    } catch (e) {
      console.log({ e });
    }
  }

  toFixed(number: number, toFixed = 0): number {
    return Number(number.toFixed(toFixed));
  }

  generateExplorerLink(tx: string) {
    return `${this.EXPLORER_PUBLIC}/tx/${tx}`;
  }
}
