import { Scene } from "@core";
import { Routes, Token, keyboards, selectFromArray } from "@helpers";
import { walletService } from "@services";

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

scene.on("text", async (ctx) => {
  const { wallet, transaction } = ctx.session;
  const { symbol } = transaction.cryptoWallet;
  const { from } = transaction;

  // Checking Value
  const value = Number(ctx.message.text);
  if (!value)
    return ctx.reply(
      ctx.t("error:incorrect_format"),
      keyboards.cancel(Routes.WALLET_START)
    );

  console.log({ transaction });

  // Checking Wallet
  const cryptoWallet = selectFromArray(wallet.cryptoWallets, { symbol });
  if (!cryptoWallet)
    return ctx.reply(
      ctx.t("error:incorrect_format"),
      keyboards.cancel(Routes.WALLET_START)
    );

  // Calculating Transaction
  const calculatedTx = await walletService.calculateTx({ from, value });
  const { input } = calculatedTx;

  console.log({ calculatedTx });

  // Checking Funds
  const fundsAvailable = cryptoWallet?.balance >= input || false;
  if (!fundsAvailable)
    return ctx.reply(
      ctx.t("error:wallet.insufficient_balance"),
      keyboards.back(Routes.WALLET_START)
    );

  // Updating Session
  ctx.session.transaction = {
    ...ctx.session.transaction,
    ...calculatedTx,
    cryptoWallet,
  };

  return ctx.scene.enter(Routes.WITHDRAW_ADDRESS);
});
