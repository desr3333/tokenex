import { Telegraf } from "telegraf";
import { TelegramContext } from "./types";

const { BOT_TOKEN } = process.env;

export const bot = new Telegraf<TelegramContext>(BOT_TOKEN);

bot.start((ctx) => ctx.reply("Hello!"));

bot.on("text", (ctx) => ctx.reply(ctx.message.text));
bot.on("sticker", (ctx) => ctx.replyWithSticker(ctx.message.sticker.file_id));
