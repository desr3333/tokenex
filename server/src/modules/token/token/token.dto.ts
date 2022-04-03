import { ApiProperty } from '@nestjs/swagger';

import { Prisma } from '@prisma/client';

export class CreateTokenDto {
  @ApiProperty()
  symbol: string;

  @ApiProperty()
  contractAddress?: string;

  @ApiProperty()
  feeAddress: string;

  @ApiProperty()
  withdrawFee?: number;

  @ApiProperty()
  depositFee?: number;

  @ApiProperty()
  raindropFee?: number;

  @ApiProperty({ default: new Date() })
  createdAt?: Date;

  @ApiProperty({ default: new Date() })
  updatedAt?: Date;
}

export class UpdateTokenDto {
  @ApiProperty()
  symbol?: string;

  @ApiProperty()
  contractAddress?: string;

  @ApiProperty()
  feeAddress?: string;

  @ApiProperty()
  withdrawFee?: number;

  @ApiProperty()
  depositFee?: number;

  @ApiProperty()
  raindropFee?: number;

  @ApiProperty({ default: new Date() })
  updatedAt?: Date;
}

export class QueryTokenDto {
  @ApiProperty()
  where: Prisma.TokenWhereInput;
}

export class TokenServiceInterface {
  create: (...args) => Promise<any>;
  update?: (...args) => Promise<any>;
  delete?: (...args) => Promise<any>;
  getBalance?: (...args) => Promise<number>;
}
