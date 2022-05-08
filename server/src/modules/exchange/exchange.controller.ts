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
    try {
      const result = await this.exchangeService.createOrder(body);
      return res.status(200).json({ result });
    } catch (e) {
      console.log({ e });
      return res.status(400).json({ error: e });
    }
  }

  @Post('calculate')
  async calculateOrder(@Res() res: Response, @Body() body: ExchangeRequestDto) {
    try {
      const result = await this.exchangeService.calculateTx(body);
      if (!result) return res.status(400).json({ error: 'Exchange Failed!' });
      return res.status(200).json({ result });
    } catch (e) {
      console.log({ e });
      return res.status(400).json({ error: e });
    }
  }
}
