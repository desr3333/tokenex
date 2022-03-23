import { i18n } from "i18next";
import { Context, Middleware, MiddlewareFn, Scenes } from "telegraf";

export interface TelegramContext extends Context {
  session: TelegramSession;
  scene: Scenes.SceneContextScene<TelegramContext, TelegramSceneSession>;

  i18n: i18n;
}

export interface TelegramSession
  extends Scenes.SceneSession<TelegramSceneSession>,
    TelegramSessionState {
  account: any;
  wallet: any;
  telegramAccount: any;

  ETHWallet?: any;
  BTCWallet?: any;
  USDTWallet?: any;
}

export interface TelegramSessionState {
  token?: string;
}
export interface TelegramSceneSession extends Scenes.SceneSessionData {}

export type TelegramMiddleware = Middleware<TelegramContext>;
