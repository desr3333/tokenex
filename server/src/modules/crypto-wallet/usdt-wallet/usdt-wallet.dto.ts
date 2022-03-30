import { ApiProperty } from '@nestjs/swagger';
import { ERC20TransferDto } from '@modules/token/erc20';

export class CreateUSDTWalletDto {
  @ApiProperty()
  walletId: number;

  @ApiProperty({ default: 'USDT' })
  symbol?: string;
}

export class USDTTransferDto extends ERC20TransferDto {}
