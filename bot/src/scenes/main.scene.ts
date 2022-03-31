import { Scene } from "@core";
import { Routes, keyboards } from "@helpers";

export const scene = new Scene(Routes.MAIN);

scene.enter((ctx) => {
  const bot_username = ctx.botInfo.username;

  if (!ctx.message)
    return ctx.editMessageText(
      ctx.t("scene:main", { bot_username }),
      keyboards.main()
    );

  return ctx.replyWithHTML(
    ctx.t("scene:main", { bot_username }),
    keyboards.main()
  );
});
