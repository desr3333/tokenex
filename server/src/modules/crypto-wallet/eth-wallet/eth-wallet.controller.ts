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
import { ETHWalletService } from './eth-wallet.service';

@ApiTags('ETH Wallet')
@Controller('/crypto-wallets/eth')
export class ETHWalletController {
  constructor(private ETHWalletService: ETHWalletService) {}
  // @Inject(forwardRef(() => WalletService))
  // private walletService: WalletService,

  @Post()
  async create(@Res() res: Response, @Body() createDto: CreateCryptoWalletDto) {
    try {
      const { walletId } = createDto;
      const { symbol } = this.ETHWalletService;

      // Checking Wallet
      if (!walletId)
        return res.status(404).json({ error: `Wallet Not Found!` });

      // const existedWallet = await this.walletService.findOne({ id: walletId });
      // if (!existedWallet)
      //   return res.status(404).json({ error: `Wallet Not Found!` });

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
}
