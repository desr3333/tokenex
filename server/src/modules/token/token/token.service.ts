import { Injectable } from '@nestjs/common';
import { Prisma, Token } from '@prisma/client';

import { PrismaService } from '@modules/prisma';
import { CreateTokenDto, TokenServiceInterface } from './token.dto';

@Injectable()
export class TokenService implements TokenServiceInterface {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Token[]> {
    try {
      const result = await this.prisma.token.findMany();
      return result;
    } catch (e) {
      console.log({ e });
      return [];
    }
  }

  async findOne(where?: Prisma.TokenWhereUniqueInput): Promise<Token> {
    try {
      const result = await this.prisma.token.findUnique({ where });
      return result;
    } catch (e) {
      console.log({ e });
    }
  }

  async create(data: Prisma.TokenCreateInput): Promise<Token> {
    try {
      const result = await this.prisma.token.create({ data });
      return result;
    } catch (e) {
      console.log({ e });
    }
  }

  async update(
    where: Prisma.TokenWhereUniqueInput,
    data: Prisma.TokenUpdateInput,
  ): Promise<Token> {
    try {
      const result = await this.prisma.token.update({
        data,
        where,
      });
      return result;
    } catch (e) {
      console.log({ e });
    }
  }
  async delete(where: Prisma.TokenWhereUniqueInput): Promise<Token> {
    try {
      const result = await this.prisma.token.delete({ where });
      return result;
    } catch (e) {
      console.log({ e });
    }
  }
}
