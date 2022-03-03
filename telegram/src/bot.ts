import { TelegramBot } from "@core";
import { session } from "telegraf";
import { stage } from "./scenes";

const { BOT_TOKEN } = process.env;

export const bot = new TelegramBot(BOT_TOKEN);

bot.use(session());
bot.use(stage.middleware());

bot.catch((e: Error) => console.log({ e }));

bot.start((ctx) => ctx.scene.enter("start"));

bot.on("callback_query", (ctx) => {
  if (!("data" in ctx.update.callback_query)) return;

  const cb = ctx.update.callback_query.data;

  if (cb === "back") return ctx.scene.enter("start");

  return ctx.scene.enter(cb);
});

bot.on("text", (ctx) => ctx.reply(ctx.message.text));
bot.on("sticker", (ctx) => ctx.replyWithSticker(ctx.message.sticker.file_id));
