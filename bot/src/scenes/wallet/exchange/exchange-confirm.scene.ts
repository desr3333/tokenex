import { Scene } from "@core";
import { keyboards, Routes, selectFromArray } from "@helpers";
import { exchangeService } from "@services";

export const scene = new Scene(Routes.EXCHANGE_CONFIRM);

scene.enter((ctx) => {
  console.log(ctx.session.exchange);

  if (!ctx.message)
    return ctx.editMessageText(
      ctx.t("scene:wallet.exchange.confirm"),
      keyboards.wallet_exchange_confirm()
    );

  return ctx.reply(
    ctx.t("scene:wallet.exchange.confirm"),
    keyboards.wallet_exchange_confirm()
  );
});

scene.on("callback_query", async (ctx) => {
  const data = ctx.session.exchange;
  const exchange = await exchangeService.createOrder(data);

  console.log({ exchange });
});
