import { Scene } from "@core";
import { Routes, Token, keyboards, selectFromArray } from "@helpers";

export const scene = new Scene(Routes.WITHDRAW_AMOUNT);

scene.enter(async (ctx) => {
  const { cryptoWallet } = <{ cryptoWallet: any }>ctx.scene.state;

  const wallet_symbol = cryptoWallet?.symbol;
  const wallet_address = cryptoWallet?.address;

  if (!ctx.message)
    return ctx.editMessageText(
      ctx.t("scene:wallet.withdraw.amount", { wallet_symbol }),
      keyboards.cancel(Routes.WITHDRAW_START)
    );

  return ctx.reply(
    ctx.t("scene:wallet.withdraw.amount", { wallet_symbol }),
    keyboards.cancel(Routes.WITHDRAW_START)
  );
});

scene.on("text", (ctx) => {
  const { cryptoWallet } = <{ cryptoWallet: any }>ctx.scene.state;

  const wallet = selectFromArray(ctx.session.wallet?.cryptoWallets, {
    symbol: cryptoWallet?.symbol,
  });

  console.log({ wallet });
  ctx.reply(ctx.message.text);
});
