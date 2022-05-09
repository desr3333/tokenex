import { Scene } from "@core";
import {
  keyboards,
  parseCallbackQuery,
  Routes,
  selectFromArray,
} from "@helpers";
import { exchangeService } from "@services";
import { ExchangeDto } from "types";

export const scene = new Scene(Routes.EXCHANGE_CONFIRM);

scene.enter((ctx) => {
  const order: ExchangeDto = ctx.scene.state;

  if (!ctx.message)
    return ctx.editMessageText(
      ctx.t("scene:wallet.exchange.confirm", { order }),
      keyboards.wallet_exchange_confirm()
    );

  return ctx.reply(
    ctx.t("scene:wallet.exchange.confirm", { order }),
    keyboards.wallet_exchange_confirm()
  );
});

scene.on("callback_query", async (ctx) => {
  const callback = parseCallbackQuery(ctx.callbackQuery);
  const data = ctx.session.exchange;

  switch (callback) {
    case Routes.EXCHANGE__CONFIRM:
      await ctx.editMessageText(ctx.t("scene:loading"));

      const confirmedOrder = await exchangeService.createOrder(data);
      if (!confirmedOrder) return ctx.scene.enter(Routes.EXCHANGE_FAILED);

      ctx.session.exchange = {
        ...ctx.session.exchange,
        ...confirmedOrder,
      };

      return ctx.scene.enter(Routes.EXCHANGE_ORDER);
    case Routes.EXCHANGE__CANCEL:
      ctx.session.exchange = {};
      return ctx.scene.enter(Routes.WALLET_START);
    default:
      return;
  }
});
