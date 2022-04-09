import { Controller, Get, Res, Param } from '@nestjs/common';
import { Response } from 'express';

import { BitcoinExplorerService } from './bitcoin-explorer.service';

@Controller('explorer/btc')
export class BitcoinExplorerController {
  constructor(private BitcoinExplorerService: BitcoinExplorerService) {}

  @Get('address/:address')
  async getAddress(@Res() res: Response, @Param() params) {
    const { address } = params;

    const result = await this.BitcoinExplorerService.getAddress(address);
    if (!result)
      return res
        .status(404)
        .json({ error: `BTC Address ${address} Not Found!` });

    return res.status(200).json({ result });
  }

  @Get('tx/:tx')
  async getTransaction(@Res() res: Response, @Param() params) {
    const { tx } = params;

    const result = await this.BitcoinExplorerService.getTransaction(tx);
    if (!result)
      return res
        .status(404)
        .json({ error: `BTC Transaction ${tx} Not Found!` });

    return res.status(200).json({ result });
  }
}
