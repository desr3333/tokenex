import { Scene } from "@core";
import { keyboards, Routes, selectFromArray } from "@helpers";

export const scene = new Scene(Routes.EXCHANGE_WALLET_TO);

scene.enter((ctx) => {
  const { tokenA } = ctx.session.exchange;

  if (!ctx.message)
    return ctx.editMessageText(
      ctx.t("scene:wallet.exchange.wallet_to"),
      keyboards.wallet_exchange_wallet_to(tokenA)
    );

  return ctx.reply(
    ctx.t("scene:wallet.exchange.wallet_to"),
    keyboards.wallet_exchange_wallet_to(tokenA)
  );
});

scene.on("callback_query", (ctx) => {
  if (!("data" in ctx.update.callback_query)) return;

  const { wallet } = ctx.session;
  const callbackQuery = ctx.update.callback_query.data;
  const hash = Routes.EXCHANGE_WALLET_TO__SELECT();

  if (callbackQuery.includes(hash)) {
    const symbol = callbackQuery.split(hash)[1]?.toUpperCase();
    const cryptoWallet = selectFromArray(wallet.cryptoWallets, { symbol });

    ctx.session.exchange = {
      ...ctx.session.exchange,
      tokenB: symbol,
      to: cryptoWallet?.address,
    };

    return ctx.scene.enter(Routes.EXCHANGE_AMOUNT);
  }

  return ctx.scene.enter(Routes.WALLET_START);
});
