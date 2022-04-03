import { Scene } from "@core";
import { keyboards, Routes } from "@helpers";

export const scene = new Scene(Routes.ACCOUNT_SETTINGS_START);

scene.enter((ctx) => {
  const { language_code } = ctx.from;

  ctx.editMessageText(
    ctx.t("scene:account.settings.start", {
      language: ctx.t(`button:language.${language_code}`),
    }),
    keyboards.account.settings.start()
  );
});
