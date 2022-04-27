import axios from 'axios';
import crypto from 'crypto';

export class CoinbaseExchangeService {
  fetch = axios.create({ baseURL: process.env.COINBASE_API });

  //  constructor() {}

  // TODO
  signMessage() {
    const cb_access_timestamp = Date.now() / 1000; // in ms
    const cb_access_passphrase = '...';
    const secret = '...';
    const requestPath = '/orders';
    const body = JSON.stringify({
      price: '1.0',
      size: '1.0',
      side: 'buy',
      product_id: 'BTC-USD',
    });
    const method = 'POST';

    // create the prehash string by concatenating required parts
    const message = cb_access_timestamp + method + requestPath + body;

    // decode the base64 secret
    const key = Buffer.from(secret, 'base64');

    // create a sha256 hmac with the secret
    const hmac = crypto.createHmac('sha256', key);

    // sign the require message with the hmac
    // and finally base64 encode the result
    const cb_access_sign = hmac.update(message).digest('base64');
  }

  // TODO
  async getProfile() {
    try {
      const signedMessage = this.signMessage();

      console.log({ signedMessage });
      //   const response = await this.fetch.get('/profiles');

      //   console.log({ response });
    } catch (e) {
      console.log(e?.response?.data);
    }
  }
}
