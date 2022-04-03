import { Scene } from "@core";
import { keyboards, Routes, selectFromArray } from "@helpers";

export const scene = new Scene(Routes.DEPOSIT_WALLET);

scene.enter((ctx) => {
  if (!ctx.message)
    return ctx.editMessageText(
      ctx.t("scene:wallet.deposit.wallet.select"),
      keyboards.wallet_deposit_wallet()
    );

  return ctx.reply(
    ctx.t("scene:wallet.deposit.wallet.select"),
    keyboards.wallet_deposit_wallet()
  );
});

scene.on("callback_query", (ctx) => {
  if (!("data" in ctx.update.callback_query)) return;

  const { wallet } = ctx.session;
  const callbackQuery = ctx.update.callback_query.data;
  const hash = Routes.DEPOSIT_WALLET__SELECT();

  if (callbackQuery.includes(hash)) {
    const symbol = callbackQuery.split(hash)[1]?.toUpperCase();
    const cryptoWallet = selectFromArray(wallet.cryptoWallets, { symbol });

    return ctx.scene.enter(Routes.DEPOSIT_ADDRESS, { cryptoWallet });
  }

  return ctx.scene.enter(Routes.WALLET_START);
});
