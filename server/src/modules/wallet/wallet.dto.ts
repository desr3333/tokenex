import { ApiProperty } from '@nestjs/swagger';

export class CreateWalletDto {
  @ApiProperty({ default: new Date() })
  createdAt?: Date;
}

export class UpdateWalletDto {
  @ApiProperty({ default: new Date() })
  updatedAt?: Date;
}

export class WalletTransferDto {
  @ApiProperty()
  from?: string;

  @ApiProperty()
  to?: string;

  @ApiProperty()
  value?: number;
}

export class WalletWithdrawDto extends WalletTransferDto {}
