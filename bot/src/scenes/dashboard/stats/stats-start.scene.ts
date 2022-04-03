import { Scene } from "@core";
import { Routes, keyboards } from "@helpers";

export const scene = new Scene(Routes.DASHBOARD_STATS_START);

scene.enter((ctx) => {
  if (!ctx.message)
    return ctx.editMessageText(
      ctx.t("scene:dashboard.stats.start"),
      keyboards.dashboard.stats.start()
    );

  return ctx.reply(
    ctx.t("scene:dashboard.stats.start"),
    keyboards.dashboard.stats.start()
  );
});
