import "module-alias/register";
import dotenv from "dotenv";

dotenv.config();

import { TelegramBot, I18n } from "@core";
import { Routes } from "@helpers";

import { session } from "telegraf";
import { stage } from "./scenes";
import { accountMiddleware, startMiddleware } from "./middlewares";

const { PORT, BOT_TOKEN } = process.env;

export const bot = new TelegramBot(BOT_TOKEN);

// Middlewares
bot.use(I18n.middleware());
bot.use(session());
bot.use(stage.middleware());
bot.catch((e: Error) => console.log({ e }));

bot.hears(/.*/, accountMiddleware);
bot.action(/.*/, accountMiddleware);

// Handlers

bot.command(["raindrop"], (ctx) => ctx.reply("🌧️🌧️🌧️"));

bot.on("text", (ctx) => {
  const { account } = ctx.session;
  if (!account) return;

  switch (account.role) {
    case "admin":
      return ctx.scene.enter(Routes.DASHBOARD_START);
    default:
      return ctx.scene.enter(Routes.MAIN);
  }
});

bot.on("callback_query", (ctx) => {
  if (!("data" in ctx.update.callback_query)) return;

  const callbackQuery = ctx.update.callback_query.data;

  return ctx.scene.enter(callbackQuery).catch((e) => console.log({ e }));
});

(async () => {
  await bot
    .launch({})
    .then(() => console.log(`Bot: Running (${PORT})`))
    .catch((e) => console.log({ e }));

  await I18n.init();
})();
