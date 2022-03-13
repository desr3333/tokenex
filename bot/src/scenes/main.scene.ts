import { Scene } from "@core";
import { routes, inlineKeyboards } from "@helpers";

const { SUPPORT } = process.env;

export const scene = new Scene(routes.MAIN);

scene.enter((ctx) => {
  const bot_username = ctx.botInfo.username;

  if (!ctx.message)
    return ctx.editMessageText(
      ctx.i18n.t("scene:main", { bot_username }),
      inlineKeyboards.main()
    );

  return ctx.reply(
    ctx.i18n.t("scene:main", { bot_username }),
    inlineKeyboards.main()
  );
});
