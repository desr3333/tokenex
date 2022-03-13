import { Scene } from "@core";
import { routes } from "@helpers";

export const scene = new Scene(routes.DEPOSIT);

scene.enter((ctx) => {
  const text = `⬇️ Deposit\n\nWhat cryptocurrency do you want to deposit into your wallet?`;
  const markup = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "BTC", callback_data: "deposit_token__btc" },
          { text: "ETH", callback_data: "deposit_token__eth" },
          { text: "USDT", callback_data: "deposit_token__usdt" },
        ],
        [{ text: "↩️ Back", callback_data: routes.WALLET }],
      ],
    },
  };

  if (!ctx.message) return ctx.editMessageText(text, markup);

  return ctx.reply(text, markup);
});
