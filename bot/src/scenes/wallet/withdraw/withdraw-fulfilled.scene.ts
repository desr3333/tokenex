import { Scene } from "@core";
import { Routes } from "@helpers";

export const scene = new Scene(Routes.WITHDRAW_FULFILLED);

scene.enter(async (ctx) => {
  return ctx.reply("Fulfilled!");
});
