import { Scene } from "@core";
import { keyboards, Routes, selectFromArray } from "@helpers";
import { exchangeService } from "@services";

export const scene = new Scene(Routes.EXCHANGE_AMOUNT);

scene.enter((ctx) => {
  const order = ctx.session.exchange;
  const wallet = ctx.session.exchange.cryptoWallet;

  if (!ctx.message)
    return ctx.editMessageText(
      ctx.t("scene:wallet.exchange.amount", { order, wallet }),
      keyboards.wallet_exchange_amount()
    );

  return ctx.reply(
    ctx.t("scene:wallet.exchange.amount", { order, wallet }),
    keyboards.wallet_exchange_amount()
  );
});

scene.on("text", async (ctx) => {
  const { wallet, exchange } = ctx.session;
  const { tokenA } = exchange;

  const value = Number(ctx.message.text);
  if (!value || isNaN(value)) return ctx.reply("Invalid Value!");

  // Checking Wallet
  const cryptoWallet = selectFromArray(wallet.cryptoWallets, {
    symbol: tokenA,
  });
  if (!cryptoWallet)
    return ctx.reply(
      ctx.t("error:incorrect_format"),
      keyboards.cancel(Routes.WALLET_START)
    );

  // Calculating
  const order = { ...ctx.session.exchange, value };
  const calculatedOrder = await exchangeService.calculateOrder(order);

  // Checking
  // if ()
  console.log({ cryptoWallet });
  console.log({ calculatedOrder });

  ctx.session.exchange = calculatedOrder;

  return ctx.scene.enter(Routes.EXCHANGE_CONFIRM, calculatedOrder);
});
