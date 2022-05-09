import { Scene } from "@core";
import { keyboards, Routes } from "@helpers";

export const scene = new Scene(Routes.EXCHANGE_FAILED);

scene.enter(async (ctx) => {
  if (!ctx.message)
    return ctx.editMessageText(
      ctx.t("scene:wallet.exchange.failed"),
      keyboards.back_to_wallet()
    );

  return ctx.reply(
    ctx.t("scene:wallet.exchange.failed"),
    keyboards.back_to_wallet()
  );
});
