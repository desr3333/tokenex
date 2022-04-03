import { Scene } from "@core";
import { Routes, keyboards } from "@helpers";

export const scene = new Scene(Routes.DASHBOARD_START);

scene.enter((ctx) => {
  const { first_name } = ctx.from;
  const { telegramAccount } = ctx.session;

  if (!ctx.message)
    return ctx.editMessageText(
      ctx.t("scene:dashboard.start", { first_name }),
      keyboards.dashboard.start()
    );

  return ctx.reply(
    ctx.t("scene:dashboard.start", { first_name }),
    keyboards.dashboard.start()
  );
});
