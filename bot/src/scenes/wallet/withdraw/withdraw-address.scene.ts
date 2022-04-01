import { Scene } from "@core";
import { keyboards, Routes, selectFromArray } from "@helpers";

export const scene = new Scene(Routes.WITHDRAW_ADDRESS);

scene.enter(async (ctx) => {
  const { cryptoWallet } = <{ cryptoWallet: any }>ctx.scene.state;

  if (!ctx.message)
    return ctx.editMessageText(
      ctx.t("scene:wallet.withdraw.address"),
      keyboards.cancel(Routes.WITHDRAW_START)
    );

  return ctx.reply(
    ctx.t("scene:wallet.withdraw.address"),
    keyboards.cancel(Routes.WITHDRAW_START)
  );
});

scene.on("text", async (ctx) => {
  const { wallet, transaction } = ctx.session;

  const cryptoWallet = transaction?.cryptoWallet;
  const value = transaction?.value;

  // Checking Value
  const address = ctx.message.text;
  if (!address) return ctx.reply("Error! Incorrect Value.");

  // Updating Session
  ctx.session.transaction = {
    ...ctx.session.transaction,
    to: address,
  };

  // await ctx.reply(
  //   JSON.stringify({ from: cryptoWallet?.address, to: address, value })
  // );

  return ctx.scene.enter(Routes.WITHDRAW_CONFIRM);
});
