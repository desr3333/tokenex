import { Scene } from "@core";
import { keyboards, Routes } from "@helpers";

export const scene = new Scene(Routes.ACCOUNT_SETTINGS_LANGUAGE);

scene.enter((ctx) => {
  const { language_code } = ctx.from;

  ctx.editMessageText(
    ctx.t("scene:account.settings.language.edit", {
      language: language_code,
    }),
    keyboards.account.settings.language()
  );
});
