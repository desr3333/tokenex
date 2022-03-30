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

import { CreateCryptoWalletDto } from '@modules/crypto-wallet/crypto-wallet';

import {
  ETHWalletTransactionDto,
  ETHWalletWithdrawalDto,
} from './eth-wallet.dto';
import { ETHWalletService } from './eth-wallet.service';
import { ETHService } from '@modules/token/eth';

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
      const { value, from, to } = transactionDto;
      const { symbol } = this.ETHWalletService;

      // Sending
      const tx = await this.ETHWalletService.sendTransaction({
        value,
        from,
        to,
      });
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

  @Post('/withdraw')
  async withdraw(
    @Res() res: Response,
    @Body() withdrawalDto: ETHWalletWithdrawalDto,
  ) {
    try {
      const { value, from, to } = withdrawalDto;
      const { symbol } = this.ETHWalletService;

      // Checking Wallet
      const wallet = await this.ETHWalletService.findOneByAddress(from);
      if (!wallet)
        return res
          .status(404)
          .json({ error: `${symbol} Wallet ${from} Not Found!` });

      const gas = await this.ETHWalletService.getGasPrice();
      const balance = await this.ETHWalletService.getBalance(from);

      const isBalanceSufficient = balance >= value;
      if (!isBalanceSufficient)
        return res.status(400).json({
          error: `${symbol} Wallet ${from} Has Insufficient Balance!`,
        });

      // Confirming Transaction
      const transaction = await this.ETHWalletService.sendTransaction({
        value,
        from,
        to,
        privateKey: wallet.privateKey,
      });
      if (!transaction)
        return res.status(400).json({ error: 'Transaction Not Send!' });

      const { transactionHash } = transaction;
      const result = {
        value,
        from,
        to,
        tx: transactionHash,
        transaction,
      };

      // TODO: Sending Notification

      return res.status(201).json({ result });
    } catch (e) {
      console.log({ e });
    }
  }

  // TODO
  @Post('/deposit')
  async deposit(
    @Res() res: Response,
    @Body() depositDto: ETHWalletWithdrawalDto,
  ) {
    try {
      const { value, to } = depositDto;
      const result = { value, to };

      return res.status(200).json({ result });
    } catch (e) {
      console.log({ e });
    }
  }
}
