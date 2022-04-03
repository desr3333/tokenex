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
  create: (...args) => any;
  update?: (...args) => any;
  delete?: (...args) => any;
  getBalance: (...args) => any;
  sendTransaction: (...args) => any;
  calculateTx: (...args) => any;
  calculateGas: (...args) => any;
  generateExplorerLink: (...args) => any;
}
