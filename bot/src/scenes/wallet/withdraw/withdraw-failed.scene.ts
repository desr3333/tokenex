import { Scene } from "@core";
import { Routes } from "@helpers";

export const scene = new Scene(Routes.WITHDRAW_FAILED);

scene.enter(async (ctx) => {
  if (!ctx.message)
    return ctx.editMessageText(ctx.t("scene:wallet.withdraw.failed"));

  return ctx.reply(ctx.t("scene:wallet.withdraw.failed"));
});
