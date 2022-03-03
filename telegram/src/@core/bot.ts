import { Telegraf } from "telegraf";
import { TelegramContext } from "@types";

export class TelegramBot extends Telegraf<TelegramContext> {
  constructor(token: string) {
    super(token);
  }
}
