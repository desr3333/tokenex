import { Routes, TelegramBot } from "@core";
import { I18n } from "@lib";

import { session } from "telegraf";
import { stage } from "./scenes";

const { BOT_TOKEN } = process.env;

export const bot = new TelegramBot(BOT_TOKEN);

bot.use(session());
bot.use(stage.middleware());
bot.use(I18n.middleware());

bot.catch((e: Error) => console.log({ e }));

bot.start((ctx) => ctx.scene.enter(Routes.MAIN));

bot.on("callback_query", (ctx) => {
  if (!("data" in ctx.update.callback_query)) return;

  const query = ctx.update.callback_query.data;

  switch (query) {
    case "back":
      return ctx.scene.enter(Routes.MAIN);
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

  console.log(ctx.i18n.t("hello"));

  ctx.scene.enter(Routes.MAIN);
});
bot.on("sticker", (ctx) => ctx.scene.enter(Routes.MAIN));
