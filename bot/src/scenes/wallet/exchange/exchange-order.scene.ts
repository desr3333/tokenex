import { Scene } from "@core";
import { keyboards, Routes } from "@helpers";

export const scene = new Scene(Routes.EXCHANGE_ORDER);

scene.enter((ctx) => {
  const order = ctx.session.exchange;

  console.log({ order });

  if (!ctx.message)
    return ctx.editMessageText(
      ctx.t("scene:wallet.exchange.order", { order }),
      keyboards.back_to_wallet()
    );

  return ctx.reply(
    ctx.t("scene:wallet.exchange.order", { order }),
    keyboards.back_to_wallet()
  );
});
