import "module-alias/register";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "./../.env") });

import fastify from "fastify";
import { TelegramBot, I18n } from "@core";
import {
  keyboards,
  parseCallbackQuery,
  Routes,
  TelegramNotication,
} from "@helpers";

import { session } from "telegraf";
import { stage } from "./scenes/stage";
import { updateMiddleware } from "./middlewares";
import { Update } from "telegraf/typings/core/types/typegram";
import { TelegramNotificationDto, TelegramTextMessageDto } from "types";

const { PORT, BOT_TOKEN, BOT_SECRET_PATH, BOT_WEBHOOK } = process.env;

(async () => {
  try {
    const app = fastify();
    const bot = new TelegramBot(BOT_TOKEN);

    const SECRET_PATH = BOT_SECRET_PATH;
    const WEBHOOK = `${BOT_WEBHOOK}/${SECRET_PATH}`;

    // Bot
    bot.use(I18n.middleware());
    bot.use(session());
    bot.use(stage.middleware());
    bot.catch((e: Error) => console.log({ e }));

    bot.hears(/.*/, updateMiddleware);
    bot.action(/.*/, updateMiddleware);

    bot.command(["test"], (ctx) => ctx.reply("🤔🤔🤔"));
    bot.command(["raindrop"], (ctx) => ctx.reply("🌧️🌧️🌧️"));

    bot.on("text", (ctx) => {
      const { account } = ctx.session;
      if (!account) return;

      return ctx.scene.enter(Routes.START);
    });

    bot.on("callback_query", (ctx) => {
      const data = parseCallbackQuery(ctx.callbackQuery);

      return ctx.scene.enter(data).catch((e) => {
        console.log({ e });
        return ctx.scene.enter(Routes.START);
      });
    });

    await bot.telegram.setWebhook(WEBHOOK);
    await I18n.init();

    // App
    app.post(`/${SECRET_PATH}`, (req, rep) => {
      bot.handleUpdate(<Update>req.body, rep.raw);
    });

    app.post(`/${SECRET_PATH}/messages`, (req, rep) => {
      const { chat_id, text, extra } = <TelegramTextMessageDto>req.body;
      return bot.telegram.sendMessage(chat_id, text, extra);
    });

    app.post(`/${SECRET_PATH}/notifications`, async (req, rep) => {
      const body = <TelegramNotificationDto>req.body;
      const { chat_id, type, payload } = body;

      const message = await bot.telegram.sendMessage(
        chat_id,
        JSON.stringify({ type, payload })
      );
      if (!message) return rep.status(400).send({ result: body });

      // switch (type) {
      //   case "TRANSACTION_CONFIRMED":
      //     bot.telegram.sendMessage(chat_id, JSON.stringify(payload));
      //   // return bot.telegram.sendMessage(
      //   //   chat_id,
      //   //   I18n.t("notification:wallet.transaction", {
      //   //     symbol,
      //   //     value,
      //   //     from,
      //   //     to,
      //   //   }),
      //   //   keyboards.wallet_transaction({ explorerLink })
      //   // );
      //   default:
      //     return;
      // }
    });

    app.listen({ port: PORT }).then(() => {
      console.log(`Bot Running [${PORT}]`);
    });
  } catch (e) {
    console.log({ e });
  }
})();
