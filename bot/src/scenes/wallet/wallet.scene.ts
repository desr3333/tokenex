import { Scene } from "@core";
import { routes, inlineKeyboards } from "@helpers";

export const scene = new Scene(routes.WALLET);

scene.enter((ctx) => {
  ctx.editMessageText(
    ctx.i18n.t("scene:wallet.main"),
    inlineKeyboards.wallet_main()
  );
});
