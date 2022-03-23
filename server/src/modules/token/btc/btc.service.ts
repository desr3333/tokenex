import { Injectable } from '@nestjs/common';

import * as bip32 from 'bip32';
import * as bip39 from 'bip39';
import * as bitcoin from 'bitcoinjs-lib';

@Injectable()
export class BTCService {
  async create() {
    const network = bitcoin.networks.testnet;
    const path = `m/49'/1'/0'/0`;

    // m/49'/0'/0'/0 for networks.bitcoin
    // m/49'/1'/0'/0 for networks.testnet

    const mnemonic = bip39.generateMnemonic();
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const root = bip32.fromSeed(seed, network);

    const account = root.derivePath(path);
    const node = account.derive(0).derive(0);

    const address = bitcoin.payments.p2pkh({
      pubkey: node.publicKey,
      network: network,
    }).address;

    const key = node.toWIF();

    const result = {
      address,
      key,
      mnemonic,
    };

    return result;
  }
}
