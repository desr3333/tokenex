import "module-alias/register";
import dotenv from "dotenv";

dotenv.config();

import { TelegramBot } from "@core";
import { routes } from "@helpers";
import { I18n } from "@core/lib";

import { session } from "telegraf";
import { stage } from "./scenes";

const { BOT_TOKEN } = process.env;

export const bot = new TelegramBot(BOT_TOKEN);

bot.use(I18n.middleware());
bot.use(session());
bot.use(stage.middleware());

bot.catch((e: Error) => console.log({ e }));

bot.start((ctx) => ctx.scene.enter(routes.MAIN));

bot.on("callback_query", (ctx) => {
  if (!("data" in ctx.update.callback_query)) return;

  const query = ctx.update.callback_query.data;

  switch (query) {
    case "back":
      return ctx.scene.enter(routes.MAIN);
    default:
      if (query.includes("deposit_token__")) {
        const token = query.split("deposit_token__")[1];

        ctx.session.token = token;

        return ctx.scene.enter("deposit_token");
      }

      return ctx.scene.enter(query);
  }
});

bot.on("text", (ctx) => {
  console.log({ message: ctx.message?.text });

  console.log(ctx.i18n.t("scene:test", { bot_username: "ETST" }));
  console.log(ctx.i18n.t("scene:main", { bot_username: "ETST" }));

  ctx.scene.enter(routes.MAIN);
});
bot.on("sticker", (ctx) => ctx.scene.enter(routes.MAIN));

(async () => {
  await bot.launch({}).then(() => console.log(`Bot: Running`));
  await I18n.init().then(() => console.log(`I18n: Ready`));
})();
