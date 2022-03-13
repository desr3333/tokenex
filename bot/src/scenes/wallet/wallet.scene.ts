import { Routes, Scene } from "@core";

export const scene = new Scene(Routes.WALLET);

scene.enter((ctx) => {
  ctx.editMessageText(`💰️ My Wallet\n\nBTC: 0\nETH: 0\nUSDT: 0`, {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "⬇️ Deposit", callback_data: Routes.DEPOSIT },
          { text: "⬆️ Withdraw", callback_data: Routes.WITHDRAW },
        ],
        [{ text: "♻️ Exchange", callback_data: Routes.EXCHANGE }],
        [{ text: "↩️ Back", callback_data: "back" }],
      ],
    },
  });
});
