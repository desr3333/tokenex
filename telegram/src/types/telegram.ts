import { Context } from "telegraf/typings/context";

export interface TelegramContext extends Context {
  test?: string;
  // session: CustomSession;
  // scene: Scenes.SceneContextScene<CustomContext, CustomSceneSession>;
}
