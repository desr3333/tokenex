import { Controller, Get, Res, Param } from '@nestjs/common';
import { Response } from 'express';

import { EthereumExplorerService } from './ethereum-explorer.service';

@Controller('explorer/eth')
export class EthereumExplorerController {
  constructor(private EthereumExplorerService: EthereumExplorerService) {}

  @Get('address/:address')
  async getAddress(@Res() res: Response, @Param() params) {
    const { address } = params;

    const result = await this.EthereumExplorerService.getAddress(address);
    if (!result)
      return res
        .status(404)
        .json({ error: `ETH Address ${address} Not Found!` });

    return res.status(200).json({ result });
  }

  @Get('tx/:tx')
  async getTransaction(@Res() res: Response, @Param() params) {
    const { tx } = params;

    const result = await this.EthereumExplorerService.getTransaction(tx);
    if (!result)
      return res
        .status(404)
        .json({ error: `ETH Transaction ${tx} Not Found!` });

    return res.status(200).json({ result });
  }
}
