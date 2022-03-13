import { Routes, Scene } from "@core";

export const scene = new Scene(Routes.DEPOSIT);

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
        [{ text: "↩️ Back", callback_data: Routes.WALLET }],
      ],
    },
  };

  if (!ctx.message) return ctx.editMessageText(text, markup);

  return ctx.reply(text, markup);
});
