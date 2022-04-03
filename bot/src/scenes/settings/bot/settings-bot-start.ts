import { Scene } from "@core";
import { keyboards, Routes } from "@helpers";

export const scene = new Scene(Routes.SETTINGS_BOT_START);

scene.enter(async (ctx) => {
  const { from, to, value } = ctx.session.transaction;

  if (!ctx.message)
    return ctx.editMessageText(
      ctx.t("scene:settings.bot.start")
      // keyboards.wallet_withdraw_confirm()
    );

  return ctx.reply(
    ctx.t("scene:settings.bot.start")
    // keyboards.wallet_withdraw_confirm()
  );
});
