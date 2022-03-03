import dotenv from "dotenv";
dotenv.config();

import { bot } from "./bot";

(async () => {
  bot.launch({}).then(() => {
    console.log(`Bot:Running`);
  });
})();
