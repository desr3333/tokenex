export class CreateAccountDto {
  role?: string;
  banned?: boolean;
  walletId?: number;
  telegramAccountId?: number;
}

export class UpdateAccountDto {
  role?: string;
  banned?: boolean;
  walletId?: number;
  telegramAccountId?: number;
}
