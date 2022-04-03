import "module-alias/register";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "./../.env") });

import { TelegramBot, I18n } from "@core";
import { handleCallbackQuery, Routes } from "@helpers";

import { session } from "telegraf";
import { stage } from "./scenes/stage";
import { updateMiddleware, startMiddleware } from "./middlewares";

const { PORT, BOT_TOKEN } = process.env;

export const bot = new TelegramBot(BOT_TOKEN);

// Middlewares
bot.use(I18n.middleware());
bot.use(session());
bot.use(stage.middleware());
bot.catch((e: Error) => console.log({ e }));

bot.hears(/.*/, updateMiddleware);
bot.action(/.*/, updateMiddleware);

// Commands
bot.command(["test"], (ctx) => ctx.reply("🤔🤔🤔"));
bot.command(["raindrop"], (ctx) => ctx.reply("🌧️🌧️🌧️"));

// Handlers

bot.on("text", (ctx) => {
  const { account } = ctx.session;
  if (!account) return;

  return ctx.scene.enter(Routes.START);
});

bot.on("callback_query", (ctx) => {
  const data = handleCallbackQuery(ctx.callbackQuery);

  return ctx.scene.enter(data).catch((e) => {
    console.log({ e });
    return ctx.scene.enter(Routes.START);
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
