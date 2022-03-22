import { Injectable } from '@nestjs/common';

import { TelegramAccountService } from './../telegram-account';
import { TelegramAuthRequestDto } from './auth.dto';

@Injectable()
export class AuthService {}

@Injectable()
export class DiscordAuthService {}

@Injectable()
export class TelegramAuthService {
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

  async validateAccount({ chatId }: TelegramAuthRequestDto): Promise<boolean> {
    // Checking Account
    const existedAccount = await this.telegramAccountService.findOne({
      chatId,
    });

    console.log({ existedAccount });

    if (!existedAccount) return false;

    return true;
  }

  // TODO
  async authenticate({
    chatId,
    botToken,
  }: TelegramAuthRequestDto): Promise<boolean> {
    const isBotValid = this.validateBot({ botToken });
    const isAccountValid = await this.validateAccount({ chatId });
    const isAuthenticated = (isBotValid && isAccountValid) || false;

    console.log({ isBotValid, isAccountValid });

    if (!isAuthenticated) return false;

    return true;
  }
  // ..
}
