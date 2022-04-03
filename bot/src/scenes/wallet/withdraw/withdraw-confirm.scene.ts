import { Scene } from "@core";
import { handleCallbackQuery, keyboards, Routes } from "@helpers";
import { walletService } from "@services";

export const scene = new Scene(Routes.WITHDRAW_CONFIRM);

scene.enter(async (ctx) => {
  const { from, to, value, cryptoWallet } = ctx.session.transaction;

  const vars = {
    from,
    to,
    value,
    symbol: cryptoWallet?.symbol,
  };

  if (!ctx.message)
    return ctx.editMessageText(
      ctx.t("scene:wallet.withdraw.confirm", vars),
      keyboards.wallet_withdraw_confirm()
    );

  return ctx.reply(
    ctx.t("scene:wallet.withdraw.confirm", vars),
    keyboards.wallet_withdraw_confirm()
  );
});

scene.on("callback_query", async (ctx) => {
  const data = handleCallbackQuery(ctx.callbackQuery);
  const { from, to, value } = ctx.session.transaction;

  switch (data) {
    case Routes.WITHDRAW__CONFIRM:
      const transaction = await walletService.withdraw({ from, to, value });
      if (!transaction) return ctx.scene.enter(Routes.WITHDRAW_FAILED);

      ctx.session.transaction = transaction;

      return ctx.scene.enter(Routes.WITHDRAW_TRANSACTION);

    case Routes.WITHDRAW__CANCEL:
      ctx.session.transaction = {};
      return ctx.scene.enter(Routes.WALLET_START);

    default:
      return;
  }
});
