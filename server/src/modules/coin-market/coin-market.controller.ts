import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { CoinmarketService } from './coin-market.service';

@ApiTags('CoinMarket')
@Controller('coinmarket')
export class CoinmarketController {
  constructor(private coindataService: CoinmarketService) {}

  @ApiQuery({ name: 'symbol', type: 'string' })
  @Get('tickers')
  async getTickers(@Res() res: Response, @Query() query) {
    const { symbol } = query;

    const symbols: string[] = symbol?.split(',');

    const result = await this.coindataService.getTickers(symbols);
    if (!result)
      return res.status(400).json({ error: 'Coin Quotes Not Fetched!' });

    return res.status(200).json({ result });
  }

  @ApiParam({ name: 'symbol', type: 'string' })
  @Get('tickers/:symbol')
  async getTicker(@Res() res: Response, @Param() param) {
    const { symbol } = param;

    const result = await this.coindataService.getTicker(symbol);
    if (!result)
      return res.status(404).json({ error: `Ticker ${symbol} Not Found!` });

    return res.status(200).json({ result });
  }
}
