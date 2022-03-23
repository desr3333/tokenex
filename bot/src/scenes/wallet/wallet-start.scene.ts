import { Scene } from "@core";
import { routes, inlineKeyboards } from "@helpers";

export const scene = new Scene(routes.WALLET);

scene.enter((ctx) => {
  const { wallet } = ctx.session;

  if (!ctx.message)
    return ctx.editMessageText(
      ctx.i18n.t("scene:wallet.main"),
      inlineKeyboards.wallet_main()
    );

  return ctx.reply(
    ctx.i18n.t("scene:wallet.main"),
    inlineKeyboards.wallet_main()
  );
});
