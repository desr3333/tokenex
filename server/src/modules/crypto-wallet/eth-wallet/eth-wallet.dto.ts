import { ApiProperty } from '@nestjs/swagger';

export class CreateETHWalletDto {
  @ApiProperty()
  walletId: number;
}
