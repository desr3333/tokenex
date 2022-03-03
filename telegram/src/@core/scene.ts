import { TelegramContext } from "@types";
import { Scenes } from "telegraf";
import { BaseScene } from "telegraf/typings/scenes";

export class Scene extends Scenes.BaseScene<TelegramContext> {
  constructor(id: string) {
    super(id);
  }
}

export class Stage extends Scenes.Stage<TelegramContext> {
  constructor(scenes?: readonly Scene[]) {
    super(scenes);
  }
}
