import { Injectable } from '@nestjs/common';

@Injectable()
export class BTCService {
  async create() {
    // const privateKey = new bitcore.PrivateKey();
    // const address = privateKey.toAddress().toString();
    // const mnemonics = new Mnemonic(Mnemonic.Words.ENGLISH);
    // const code = mnemonics.toString();
    // const xpriv = mnemonics.toHDPrivateKey();
    // const utxo = {
    //   txId: '115e8f72f39fad874cfab0deed11a80f24f967a84079fb56ddf53ea02e308986',
    //   outputIndex: 0,
    //   address: '17XBj6iFEsf8kzDMGQk5ghZipxX49VXuaV',
    //   script: '76a91447862fe165e6121af80d5dde1ecb478ed170565b88ac',
    //   satoshis: 50000,
    // };
    // const transaction = new bitcore.Transaction()
    //   .from(utxo)
    //   .to('1Gokm82v6DmtwKEB8AiVhm82hyFSsEvBDK', 15000)
    //   .sign(privateKey);
    // console.log({ transaction });
  }
}
