import { Scene } from "@core";
import {
  parseCallbackQuery,
  keyboards,
  Routes,
  selectFromArray,
} from "@helpers";

export const scene = new Scene(Routes.SETTINGS_START);

scene.enter(async (ctx) => {
  if (!ctx.message)
    return ctx.editMessageText(
      ctx.t("scene:settings.start"),
      keyboards.settings.start()
    );

  return ctx.reply(ctx.t("scene:settings.start"), keyboards.settings.start());
});

scene.on("callback_query", (ctx) => {
  const { wallet } = ctx.session;
  const callbackQuery = parseCallbackQuery(ctx.callbackQuery);
  const route = Routes.SETTINGS_TOKEN__SELECT();

  if (callbackQuery?.includes(route)) {
    const symbol = callbackQuery.split(route)[1]?.toUpperCase();
    const cryptoWallet = selectFromArray(wallet.cryptoWallets, { symbol });

    return ctx.scene.enter(Routes.SETTINGS_TOKEN_START, cryptoWallet);
  }

  return ctx.scene.enter(Routes.DASHBOARD_START);
});
