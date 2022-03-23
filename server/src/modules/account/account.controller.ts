import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';

import { AccountService } from './account.service';
import { WalletService } from './../wallet';
import { CreateAccountDto, UpdateAccountDto } from './account.dto';
import { Response } from 'express';

@ApiTags('Account')
@Controller('/accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  // private readonly walletService: WalletService,

  @Get()
  async getAll(): Promise<any> {
    const result = await this.accountService.query({});
    return { result };
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: 'integer',
  })
  async getByKey(@Param() params): Promise<any> {
    const id = Number(params.id);

    const result = await this.accountService.findOne({ id });
    if (!result) return { error: `Account #${id} Not Found!` };

    return { result };
  }

  @Post()
  async create(
    @Res() res: Response,
    @Body() createDto: CreateAccountDto,
  ): Promise<any> {
    // Creating Account
    const createdAccount = await this.accountService.create(createDto);
    if (!createdAccount)
      return res.status(400).json({ error: `Account Not Created!` });

    // Creating Wallet
    // const createdWallet = await this.walletService.create();
    // if (!createdWallet)
    //   return res.status(400).json({ error: `Wallet Not Created!` });

    // Updating Account
    // const updatedAccount = await this.accountService.update(
    //   { id: createdAccount.id },
    //   { walletId: createdWallet.id },
    // );
    // if (!updatedAccount)
    //   return res.status(400).json({ error: `Account Not Created!` });

    // return res.status(201).json({ result: updatedAccount });
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: 'integer',
  })
  async update(
    @Param() params,
    @Body() updateDto: UpdateAccountDto,
  ): Promise<any> {
    const id = Number(params.id);

    // Checking Account
    const existedAccount = await this.accountService.findOne({ id });
    if (!existedAccount) return { error: `Account #${id} Not Found!` };

    // Updating Account
    const result = await this.accountService.update({ id }, updateDto);
    return { result };
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: 'integer',
  })
  async delete(@Param() params): Promise<any> {
    const id = Number(params.id);

    // Checking Account
    const existedAccount = await this.accountService.findOne({ id });
    if (!existedAccount) return { error: `Account #${id} Not Found!` };

    // Deleting Account
    const result = await this.accountService.delete({ id });
    return { result };
  }
}
