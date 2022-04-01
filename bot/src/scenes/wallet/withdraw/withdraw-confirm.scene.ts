import { Scene } from "@core";
import { handleCallbackQuery, keyboards, Routes } from "@helpers";

export const scene = new Scene(Routes.WITHDRAW_CONFIRM);

scene.enter(async (ctx) => {
  const { from, to, value } = ctx.session.transaction;

  if (!ctx.message)
    return ctx.editMessageText(
      ctx.t("scene:wallet.withdraw.confirm", { from, to, value }),
      keyboards.wallet_withdraw_confirm()
    );

  return ctx.reply(
    ctx.t("scene:wallet.withdraw.confirm", { from, to, value }),
    keyboards.wallet_withdraw_confirm()
  );
});

scene.on("callback_query", async (ctx) => {
  const data = handleCallbackQuery(ctx.callbackQuery);

  switch (data) {
    case Routes.WITHDRAW__CONFIRM:
      // TODO

      return ctx.scene.enter(Routes.WITHDRAW_FULFILLED);

    case Routes.WITHDRAW__CANCEL:
      ctx.session.transaction = {};
      return ctx.scene.enter(Routes.WALLET_START);

    default:
      return;
  }
});
