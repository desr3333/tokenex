import { Scene } from "@core";
import { inlineKeyboards, routes } from "@helpers";

export const scene = new Scene(routes.ACCOUNT_SETTINGS);

scene.enter((ctx) => {
  const { language_code } = ctx.from;

  ctx.editMessageText(
    ctx.i18n.t("scene:account.settings.main", {
      language: ctx.i18n.t(`button:language.${language_code}`),
    }),
    inlineKeyboards.account_settings()
  );
});
