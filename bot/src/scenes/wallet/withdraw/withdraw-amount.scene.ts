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
  const { wallet, transaction } = ctx.session;

  const symbol = transaction?.cryptoWallet?.symbol;

  // Checking Value
  const value = Number(ctx.message.text);
  if (!value) return ctx.reply("Error! Incorrect Value.");

  // Checking Wallet
  const cryptoWallet = selectFromArray(wallet.cryptoWallets, { symbol });
  if (!cryptoWallet) return ctx.reply("Error! Incorrect Wallet.");

  // Checking Balance
  const isBalanceSufficient = cryptoWallet?.balance >= value || false;

  console.log({ value, isBalanceSufficient, cryptoWallet });

  if (!isBalanceSufficient)
    return ctx.reply(ctx.t("error:wallet.insufficient_balance"));

  // Updating Session
  ctx.session.transaction = {
    ...ctx.session.transaction,
    cryptoWallet,
    value,
  };

  return ctx.scene.enter(Routes.WITHDRAW_ADDRESS);
});
