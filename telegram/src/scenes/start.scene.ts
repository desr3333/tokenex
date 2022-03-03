import { Scene } from "@core";

const { SUPPORT } = process.env;

export const start = new Scene("start");

start.enter((ctx) => {
  ctx.reply(
    `Use the @tokenexxbot bot as your regular cryptocurrency wallet. The wallet is linked to your Telegram account.\n\nBuy, send, receive, and exchange cryptocurrencies`,
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: "💰️ My Wallet", callback_data: "wallet" }],
          [
            { text: "💬 Support", url: SUPPORT },
            { text: "⚙️ Settings", callback_data: "settings" },
          ],
        ],
      },
    }
  );
});
