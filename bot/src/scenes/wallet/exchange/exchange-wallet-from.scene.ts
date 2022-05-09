import { Scene } from "@core";
import { keyboards, Routes, selectFromArray } from "@helpers";

export const scene = new Scene(Routes.EXCHANGE_WALLET_FROM);

scene.enter((ctx) => {
  if (!ctx.message)
    return ctx.editMessageText(
      ctx.t("scene:wallet.exchange.wallet_from"),
      keyboards.wallet_exchange_wallet_from()
    );

  return ctx.reply(
    ctx.t("scene:wallet.exchange.wallet_from"),
    keyboards.wallet_exchange_wallet_from()
  );
});

scene.on("callback_query", (ctx) => {
  if (!("data" in ctx.update.callback_query)) return;

  const { wallet } = ctx.session;
  const callbackQuery = ctx.update.callback_query.data;
  const hash = Routes.EXCHANGE_WALLET_FROM__SELECT();

  if (callbackQuery.includes(hash)) {
    const symbol = callbackQuery.split(hash)[1]?.toUpperCase();
    const cryptoWallet = selectFromArray(wallet.cryptoWallets, { symbol });

    ctx.session.exchange = {
      ...ctx.session.exchange,
      tokenA: symbol,
      from: cryptoWallet?.address,
      cryptoWallet,
    };

    return ctx.scene.enter(Routes.EXCHANGE_WALLET_TO);
  }

  return ctx.scene.enter(Routes.WALLET_START);
});
