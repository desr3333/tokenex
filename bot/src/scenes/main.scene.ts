import { Scene } from "@core";
import { routes, inlineKeyboards } from "@helpers";

export const scene = new Scene(routes.MAIN);

scene.enter((ctx) => {
  const bot_username = ctx.botInfo.username;

  if (!ctx.message)
    return ctx.editMessageText(
      ctx.i18n.t("scene:main", { bot_username }),
      inlineKeyboards.main()
    );

  return ctx.replyWithHTML(
    ctx.i18n.t("scene:main", { bot_username }),
    inlineKeyboards.main()
  );
});
