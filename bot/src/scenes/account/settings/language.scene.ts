import { Scene } from "@core";
import { inlineKeyboards, routes } from "@helpers";

export const scene = new Scene(routes.ACCOUNT_SETTINGS_LANGUAGE);

scene.enter((ctx) => {
  const { language_code } = ctx.from;

  ctx.editMessageText(
    ctx.i18n.t("scene:account.settings.language.edit", {
      language: language_code,
    }),
    inlineKeyboards.account_settings_language()
  );
});
