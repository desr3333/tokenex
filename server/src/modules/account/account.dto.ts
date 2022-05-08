import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto {
  @ApiProperty({ default: 'user' })
  role?: string;

  @ApiProperty({ default: false })
  banned?: boolean;

  @ApiProperty({ default: null })
  walletId?: string;

  @ApiProperty({ default: null })
  telegramAccountId?: string;

  @ApiProperty({ default: new Date() })
  createdAt?: Date;

  @ApiProperty({ default: new Date() })
  updatedAt?: Date;
}

export class UpdateAccountDto {
  @ApiProperty({ default: 'user' })
  role?: string;

  @ApiProperty({ default: false })
  banned?: boolean;

  @ApiProperty({ default: null })
  walletId?: string;

  @ApiProperty({ default: null })
  telegramAccountId?: string;

  @ApiProperty({ default: new Date() })
  updatedAt?: Date;
}
