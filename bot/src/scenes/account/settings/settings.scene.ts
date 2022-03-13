import { Scene } from "@core";
import { inlineKeyboards, routes } from "@helpers";

export const scene = new Scene(routes.ACCOUNT_SETTINGS);

scene.enter((ctx) => {
  ctx.editMessageText(
    ctx.i18n.t("scene:account.settings.main"),
    inlineKeyboards.account_settings()
  );
});
