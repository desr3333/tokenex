import "module-alias/register";
import dotenv from "dotenv";

dotenv.config();

import { TelegramBot, I18n } from "@core";
import { handleCallbackQuery, Routes } from "@helpers";

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

// Commands
bot.command(["test"], (ctx) => ctx.reply("🤔🤔🤔"));
bot.command(["raindrop"], (ctx) => ctx.reply("🌧️🌧️🌧️"));

// Handlers

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
  const data = handleCallbackQuery(ctx.callbackQuery);

  return ctx.scene.enter(data).catch((e) => {
    console.log({ e });
    return ctx.scene.enter(Routes.MAIN);
  });
});

// Launching Bot
(async () => {
  await bot
    .launch({})
    .then(() => console.log(`Bot: Running (${PORT})`))
    .catch((e) => console.log({ e }));

  await I18n.init();
})();
