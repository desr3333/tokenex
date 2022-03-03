import { Context, Scenes } from "telegraf";

export interface TelegramContext extends Context {
  session: TelegramSession;
  scene: Scenes.SceneContextScene<TelegramContext, TelegramSceneSession>;

  test?: string;
}

export interface TelegramSession
  extends Scenes.SceneSession<TelegramSceneSession>,
    TelegramSessionState {}

export interface TelegramSessionState {}
export interface TelegramSceneSession extends Scenes.SceneSessionData {}
