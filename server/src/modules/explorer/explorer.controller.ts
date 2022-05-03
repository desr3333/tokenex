import { Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { ExplorerService } from './explorer.service';

@Controller('explorer')
export class ExplorerController {
  constructor(private explorerService: ExplorerService) {}

  @Get(':blockchain/address/:address')
  async getAddress(@Res() res: Response, @Param() params) {
    const { blockchain, address } = params;

    const result = await this.explorerService.getAddress({
      blockchain,
      address,
    });
    if (!result)
      return res.status(404).json({ error: `Address ${address} Not Found!` });

    return res.status(200).json({ result });
  }

  @Get(':blockchain/tx/:tx')
  async getTransaction(@Res() res: Response, @Param() params) {
    const { blockchain, tx } = params;

    const result = await this.explorerService.getTransaction({
      blockchain,
      tx,
    });
    if (!result)
      return res.status(404).json({ error: `Transaction ${tx} Not Found!` });

    return res.status(200).json({ result });
  }

  @Post(':blockchain/address/:address')
  async watchAddress(@Res() res: Response, @Param() params) {
    const { blockchain, address } = params;

    const result = await this.explorerService.watchAddress({
      blockchain,
      address,
    });
    if (!result)
      return res.status(404).json({ error: `Address ${address} Not Found!` });

    return res.status(200).json({ result });
  }
}
