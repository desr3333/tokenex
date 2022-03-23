import { Scene } from "@core";
import { routes } from "@helpers";

export const scene = new Scene(routes.EXCHANGE);

scene.enter((ctx) => {
  const text = `❌ Error!\n\nYour balance is insufficient. Please, deposit crypto into your wallet!`;
  const markup = {
    reply_markup: {
      inline_keyboard: [[{ text: "↩️ Back", callback_data: routes.WALLET }]],
    },
  };

  if (!ctx.message) return ctx.editMessageText(text, markup);

  return ctx.reply(text, markup);
});
