import { Scene } from "@core";
import { parseCallbackQuery, keyboards, Routes } from "@helpers";
import { walletService } from "@services";

export const scene = new Scene(Routes.WITHDRAW_CONFIRM);

scene.enter(async (ctx) => {
  const { from, to, input, output, fee, cryptoWallet } =
    ctx.session.transaction;

  const vars = {
    from,
    to,
    input,
    output,
    symbol: cryptoWallet?.symbol,
    fee,
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
  const data = parseCallbackQuery(ctx.callbackQuery);
  const { from, to, input, output } = ctx.session.transaction;

  switch (data) {
    case Routes.WITHDRAW__CONFIRM:
      await ctx.editMessageText(ctx.t("scene:loading"));

      const transaction = await walletService.withdraw({
        from,
        to,
        value: output,
      });
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
