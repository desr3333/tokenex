import { Scene } from "@core";
import { Routes, selectFromArray, keyboards } from "@helpers";

export const scene = new Scene(Routes.WITHDRAW_WALLET);

scene.enter(async (ctx) => {
  if (!ctx.message)
    return ctx.editMessageText(
      ctx.t("scene:wallet.withdraw.wallet.select"),
      keyboards.wallet_withdraw_wallet()
    );

  return ctx.reply(
    ctx.t("scene:wallet.withdraw.wallet.select"),
    keyboards.wallet_withdraw_wallet()
  );
});

scene.on("callback_query", (ctx) => {
  if (!("data" in ctx.update.callback_query)) return;

  const { wallet } = ctx.session;
  const callbackQuery = ctx.update.callback_query.data;
  const hash = Routes.WITHDRAW_WALLET_SELECT();

  if (callbackQuery.includes(hash)) {
    const symbol = callbackQuery.split(hash)[1]?.toUpperCase();
    const cryptoWallet = selectFromArray(wallet.cryptoWallets, { symbol });

    console.log({ symbol, cryptoWallet });

    return ctx.scene.enter(Routes.WITHDRAW_AMOUNT, { cryptoWallet });
  }

  return ctx.scene.enter(Routes.WALLET_START);
});
