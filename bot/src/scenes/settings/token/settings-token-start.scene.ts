import { Scene } from "@core";
import { keyboards, Routes } from "@helpers";
import { CryptoWalletDto } from "@types";

export const scene = new Scene(Routes.SETTINGS_TOKEN_START);

scene.enter(async (ctx) => {
  const cryptoWallet = <CryptoWalletDto>ctx.scene.state;

  const vars = {
    symbol: cryptoWallet?.symbol,
    fee_address: cryptoWallet?.feeAddress,
    deposit_fee: cryptoWallet?.depositFee,
    withdraw_fee: cryptoWallet?.withdrawFee,
  };

  if (!ctx.message)
    return ctx.editMessageText(
      ctx.t("scene:settings.token.start", vars),
      keyboards.settings.token.start()
    );

  return ctx.reply(
    ctx.t("scene:settings.token.start", vars),
    keyboards.settings.token.start()
  );
});

// scene.on("callback_query", (ctx) => {
//   //   if (!("data" in ctx.update.callback_query)) return;
//   //   const { wallet } = ctx.session;
//   //   const callbackQuery = ctx.update.callback_query.data;
//   //   const route = Routes.SETTINGS_TOKEN__SELECT();
//   //   if (callbackQuery.includes(route)) {
//   //     const symbol = callbackQuery.split(route)[1]?.toUpperCase();
//   //     const cryptoWallet = selectFromArray(wallet.cryptoWallets, { symbol });
//   //     return ctx.scene.enter(Routes.DEPOSIT_ADDRESS, { cryptoWallet });
//   //   }
//   //   return ctx.scene.enter(Routes.WALLET_START);
// });
