import "module-alias/register";
import dotenv from "dotenv";

dotenv.config();

import { TelegramBot, I18n } from "@core";
import { routes } from "@helpers";

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
bot.on("text", (ctx) => {
  const { account } = ctx.session;
  if (!account) return;

  switch (account.role) {
    case "admin":
      return ctx.scene.enter(routes.DASHBOARD_START);
    default:
      return ctx.scene.enter(routes.MAIN);
  }
});

bot.on("callback_query", (ctx) => {
  if (!("data" in ctx.update.callback_query)) return;

  const query = ctx.update.callback_query.data;

  switch (query) {
    case "back":
      return ctx.scene.enter(routes.MAIN);
    default:
      if (query.includes("deposit_token__")) {
        const token = query.split("deposit_token__")[1]?.toUpperCase();

        return ctx.scene
          .enter("deposit_token", { token })
          .catch((e) => console.log({ e }));
      }

      return ctx.scene.enter(query).catch((e) => console.log({ e }));
  }
});

// bot.on("text", (ctx) => {});
// bot.on("sticker", (ctx) => ctx.scene.enter(routes.MAIN));

(async () => {
  await bot
    .launch({})
    .then(() => console.log(`Bot: Running (${PORT})`))
    .catch((e) => console.log({ e }));

  await I18n.init();
})();
