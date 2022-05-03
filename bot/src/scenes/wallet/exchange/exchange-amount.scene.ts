import { Scene } from "@core";
import { keyboards, Routes } from "@helpers";

export const scene = new Scene(Routes.EXCHANGE_AMOUNT);

scene.enter((ctx) => {
  if (!ctx.message)
    return ctx.editMessageText(
      ctx.t("scene:wallet.exchange.amount"),
      keyboards.wallet_exchange_amount()
    );

  return ctx.reply(
    ctx.t("scene:wallet.exchange.amount"),
    keyboards.wallet_exchange_amount()
  );
});

scene.on("text", (ctx) => {
  const value = Number(ctx.message.text);

  if (!value || isNaN(value)) return ctx.reply("Invalid Value!");

  ctx.session.exchange = {
    ...ctx.session.exchange,
    value,
  };

  return ctx.scene.enter(Routes.EXCHANGE_CONFIRM);
});
