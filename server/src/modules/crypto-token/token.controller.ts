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
import { Response } from 'express';

import { AccountService } from '@modules/account';

import { CreateTokenDto, QueryTokenDto, UpdateTokenDto } from './token.dto';
import { TokenService } from './token.service';

@ApiTags('Token')
@Controller('/tokens')
export class TokenController {
  constructor(private tokenService: TokenService) {}

  @Get()
  async getAll(@Res() res: Response) {
    const result = await this.tokenService.findAll();
    return res.status(200).json({ result });
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: 'integer',
  })
  async getByKey(@Res() res: Response, @Param() params) {
    const id = Number(params.id);

    const result = await this.tokenService.findOne({ id });
    if (!result)
      return res
        .status(400)
        .json({ error: `Telegram Account #${id} Not Found!` });

    return res.status(200).json({ result });
  }

  @Post()
  async create(@Res() res: Response, @Body() createDto: CreateTokenDto) {
    const { symbol } = createDto;

    const result = await this.tokenService.create(createDto);
    if (!result)
      return res.status(400).json({ error: `Token ${symbol} Not Created!` });

    return res.status(201).json({ result });
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: 'integer',
  })
  async update(
    @Res() res: Response,
    @Param() params,
    @Body() updateDto: UpdateTokenDto,
  ) {
    const id = Number(params.id);
    const { symbol } = updateDto;

    const result = await this.tokenService.update({ id }, updateDto);
    if (!result)
      return res.status(400).json({ error: `Token ${symbol} Not Updated!` });

    return res.status(200).json({ result });
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: 'integer',
  })
  async delete(@Res() res: Response, @Param() params): Promise<any> {
    const id = Number(params.id);

    const result = await this.tokenService.delete({ id });
    if (!result) return res.status(400).json({ error: `Token Not Deleted!` });

    return res.status(200).json({ result });
  }
}
