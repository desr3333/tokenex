import { Scene } from "@core";

export const wallet = new Scene("wallet");

wallet.enter((ctx) => {
  ctx.reply(`💰️ My Wallet\n\nBTC: 0\nETH: 0\nUSDT: 0`, {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "⬇️ Deposit", callback_data: "wallet_deposit" },
          { text: "⬆️ Withdraw", callback_data: "wallet_withdraw" },
        ],
        [{ text: "♻️ Exchange", callback_data: "wallet_exchange" }],
        [{ text: "↩️ Back", callback_data: "back" }],
      ],
    },
  });
});
