import { Scene } from "@core";
import { keyboards, Routes } from "@helpers";

export const scene = new Scene(Routes.ACCOUNT_START);

scene.enter((ctx) => {
  const { account } = ctx.session;

  const { id, first_name } = ctx.from;
  const vars = { id, first_name };

  if (!ctx.message)
    return ctx.editMessageText(
      ctx.t("scene:account.start", vars),
      keyboards.account.start()
    );

  return ctx.reply(
    ctx.t("scene:account.start", vars),
    keyboards.account.start()
  );
});
