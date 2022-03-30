import { ApiProperty } from '@nestjs/swagger';
import {
  CryptoWalletWithdrawalDto,
  CryptoWalletDepositDto,
} from '@modules/crypto-wallet/crypto-wallet';

export class CreateETHWalletDto {
  @ApiProperty()
  walletId: number;

  @ApiProperty({ default: 'ETH' })
  symbol?: string;
}

export class ETHWalletTransactionDto {
  @ApiProperty()
  value: number;

  @ApiProperty({ default: '0x' })
  from: string;

  @ApiProperty({ default: '0x' })
  to: string;

  privateKey?: string;
}

export class ETHWalletWithdrawalDto extends CryptoWalletWithdrawalDto {}
export class ETHWalletDepositDto extends CryptoWalletDepositDto {}
