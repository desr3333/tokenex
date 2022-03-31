import { Scene } from "@core";
import { keyboards, Routes } from "@helpers";

export const scene = new Scene(Routes.DEPOSIT_START);

scene.enter((ctx) => {
  ctx.scene.enter(Routes.DEPOSIT_WALLET);
});
