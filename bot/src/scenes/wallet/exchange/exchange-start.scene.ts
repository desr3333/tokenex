import { Scene } from "@core";
import { Routes } from "@helpers";

export const scene = new Scene(Routes.EXCHANGE);

scene.enter((ctx) => {
  return ctx.scene.enter(Routes.EXCHANGE_WALLET_FROM);
});
