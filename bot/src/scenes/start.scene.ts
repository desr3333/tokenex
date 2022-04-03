import { Scene } from "@core";
import { Routes, keyboards } from "@helpers";

export const scene = new Scene(Routes.START);

scene.enter((ctx) => {
  const { account } = ctx.session;

  const bot_username = ctx.botInfo.username;
  const isAdmin = account?.role === "admin" || false;

  if (!ctx.message)
    return ctx.editMessageText(
      ctx.t("scene:start", { bot_username }),
      keyboards.start({ isAdmin })
    );

  return ctx.replyWithHTML(
    ctx.t("scene:start", { bot_username }),
    keyboards.start({ isAdmin })
  );
});
