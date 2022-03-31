import { Scene } from "@core";
import { Routes } from "@helpers";

export const scene = new Scene(Routes.EXCHANGE);

scene.enter((ctx) => {
  const text = `❌ Error!\n\nYour balance is insufficient. Please, deposit crypto into your wallet!`;
  const markup = {
    reply_markup: {
      inline_keyboard: [
        [{ text: "↩️ Back", callback_data: Routes.WALLET_START }],
      ],
    },
  };

  if (!ctx.message) return ctx.editMessageText(text, markup);

  return ctx.reply(text, markup);
});
