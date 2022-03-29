import {
  Body,
  Controller,
  Delete,
  forwardRef,
  Get,
  HttpException,
  Inject,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { WalletService } from './../../wallet/wallet.service';
import { CreateCryptoWalletDto } from './../crypto-wallet';
import { ETHWalletTransactionDto } from './eth-wallet.dto';
import { ETHWalletService } from './eth-wallet.service';

@ApiTags('ETH Wallet')
@Controller('/crypto-wallets/eth')
export class ETHWalletController {
  constructor(private ETHWalletService: ETHWalletService) {}

  @Post('/')
  async create(@Res() res: Response, @Body() createDto: CreateCryptoWalletDto) {
    try {
      const { walletId } = createDto;
      const { symbol } = this.ETHWalletService;

      // Checking Wallet
      if (!walletId)
        return res.status(404).json({ error: `Wallet Not Found!` });

      // Creating Wallet
      const result = await this.ETHWalletService.create(createDto);
      if (!result)
        return res
          .status(400)
          .json({ error: `${symbol} Crypto Wallet Not Created!` });

      return res.status(201).json({ result });
    } catch (e) {
      console.log({ e });
    }
  }

  @Get('/:address')
  async findOne(@Res() res: Response, @Param() params: { address: string }) {
    try {
      const { address } = params;
      const { symbol } = this.ETHWalletService;

      const result = await this.ETHWalletService.findOneByAddress(address);
      if (!result)
        return res
          .status(404)
          .json({ error: `${symbol} Wallet ${address} Not Found!` });

      return res.status(200).json({ result });
    } catch (e) {
      console.log({ e });
    }
  }

  @Post('/sendTransaction')
  async sendTransaction(
    @Res() res: Response,
    @Body() transactionDto: ETHWalletTransactionDto,
  ) {
    try {
      const { value, to } = transactionDto;
      const { symbol } = this.ETHWalletService;

      // Sending
      const tx = await this.ETHWalletService.sendTransaction({ value, to });
      if (!tx)
        return res
          .status(400)
          .json({ error: `${symbol} Transaction Not Sent!` });

      const result = tx.transactionHash;

      return res.status(201).json({ result });
    } catch (e) {
      console.log({ e });
    }
  }
}
