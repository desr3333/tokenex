import { Scene } from "@core";
import { inlineKeyboards, routes } from "@helpers";

export const scene = new Scene(routes.ACCOUNT_SETTINGS_LANGUAGE);

scene.enter((ctx) => {
  ctx.editMessageText(
    ctx.i18n.t("scene:account.settings.language.edit"),
    inlineKeyboards.account_settings_language()
  );
});
