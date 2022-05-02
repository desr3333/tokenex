import { CryptoWalletService } from '@modules/crypto-wallet';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ExchangeRequestDto } from './exchange.dto';
import { ExchangeService } from './exchange.service';

@ApiTags('Exchange')
@Controller('exchange')
export class ExchangeController {
  constructor(
    private exchangeService: ExchangeService,
    private cryptoWalletService: CryptoWalletService,
  ) {}

  @Post()
  async createOrder(@Res() res: Response, @Body() body: ExchangeRequestDto) {
    const { tokenA, from, to } = body;

    // Checking Wallets
    const walletA = await this.cryptoWalletService.findOne({ address: from });
    const walletB = await this.cryptoWalletService.findOne({ address: to });

    // Checking Exchange Wallet
    const exchangeWallet = await this.exchangeService.getCoinbaseAccount({
      token: tokenA,
    });

    console.log({ exchangeWallet });

    if (walletA?.walletId !== walletB?.walletId)
      return res.status(400).json({
        error: 'You Can Exchange Funds Only Between Your Own Wallets!',
      });

    const result = await this.exchangeService.createOrder(body);
    return res.status(200).json({ result });
  }
}
