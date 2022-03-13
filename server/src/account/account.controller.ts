import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller('/accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  async getAll(): Promise<any> {
    return this.accountService.getAll();
  }

  @Get()
  async getByKey(@Param() params): Promise<any> {
    const { id } = params;

    return this.accountService.getByKey(id);
  }

  @Post()
  async create(): Promise<any> {
    return;
  }

  @Put()
  async update(@Param() params): Promise<any> {
    return;
  }

  @Delete()
  async delete(@Param() params): Promise<any> {
    return;
  }
}
