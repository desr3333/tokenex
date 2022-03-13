import { Scene, Routes } from "@core";

const { SUPPORT } = process.env;

export const scene = new Scene(Routes.MAIN);

scene.enter((ctx) => {
  const text = `Use the @tokenexxbot bot as your regular cryptocurrency wallet. The wallet is linked to your Telegram account.\n\nBuy, send, receive, and exchange cryptocurrencies`;
  const markup = {
    reply_markup: {
      inline_keyboard: [
        [{ text: "💰️ My Wallet", callback_data: Routes.WALLET }],
        [
          { text: "💬 Support", url: SUPPORT },
          { text: "⚙️ Settings", callback_data: Routes.ACCOUNT_SETTINGS },
        ],
      ],
    },
  };

  if (!ctx.message) return ctx.editMessageText(text, markup);

  return ctx.reply(text, markup);
});
