import { Scene } from "@core";
import { routes, inlineKeyboards } from "@helpers";

export const scene = new Scene(routes.DASHBOARD_START);

scene.enter((ctx) => {
  const { first_name } = ctx.from;
  const { telegramAccount } = ctx.session;

  if (!ctx.message)
    return ctx.editMessageText(
      ctx.i18n.t("scene:dashboard.main", { first_name }),
      inlineKeyboards.dashboard()
    );

  return ctx.reply(
    ctx.i18n.t("scene:dashboard.main", { first_name }),
    inlineKeyboards.dashboard()
  );
});
