import { Scene } from "@core";
import { Routes } from "@helpers";

export const scene = new Scene(Routes.WITHDRAW_START);

scene.enter(async (ctx) => {
  return ctx.scene.enter(Routes.WITHDRAW_WALLET);
});
