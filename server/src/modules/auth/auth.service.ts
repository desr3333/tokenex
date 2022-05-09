import { Injectable } from '@nestjs/common';

import { TelegramAccountService } from '@modules/telegram-account';
import { TelegramAuthRequestDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(private telegramAccountService: TelegramAccountService) {}

  validateBot({ botToken }: TelegramAuthRequestDto): boolean {
    const getHash = (token: string) => token?.slice(-5);

    const { TELEGRAM_BOT_TOKEN } = process.env;
    const _hash = getHash(TELEGRAM_BOT_TOKEN);
    const hash = getHash(botToken);

    const isValidated = _hash === hash;
    if (!isValidated) return false;

    return true;
  }

  async validateAccount({ id }: TelegramAuthRequestDto): Promise<boolean> {
    const existedAccount = await this.telegramAccountService.findOne({
      where: { id },
    });

    console.log({ existedAccount });

    if (!existedAccount) return false;

    return true;
  }

  // TODO
  async authenticate({
    id,
    botToken,
  }: TelegramAuthRequestDto): Promise<boolean> {
    const isBotValid = this.validateBot({ botToken });
    const isAccountValid = await this.validateAccount({ id });
    const isAuthenticated = (isBotValid && isAccountValid) || false;

    console.log({ isBotValid, isAccountValid });

    if (!isAuthenticated) return false;

    return true;
  }
  // ..
}
