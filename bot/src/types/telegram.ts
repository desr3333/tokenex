import { i18n } from "i18next";
import { Context, Middleware, MiddlewareFn, Scenes } from "telegraf";
import { TransactionDto, WalletDto } from "./api.dto";

export interface TelegramContext extends Context {
  session: TelegramSession;
  scene: Scenes.SceneContextScene<TelegramContext, TelegramSceneSession>;
  t: i18n["t"];
}

export interface TelegramSession
  extends Scenes.SceneSession<TelegramSceneSession>,
    TelegramSessionState {
  account: any;
  telegramAccount: any;

  wallet: WalletDto;
  transaction: TransactionDto;

  BTCWallet: any;
  ETHWallet: any;
  USDTWallet: any;
}

export interface TelegramSessionState {
  token?: string;
}
export interface TelegramSceneSession extends Scenes.SceneSessionData {}

export type TelegramMiddleware = Middleware<TelegramContext>;
