import { Scene } from "@core";
import { Routes, selectFromArray } from "@helpers";

export const scene = new Scene(Routes.WITHDRAW_ADDRESS);

scene.enter(async (ctx) => {
  const { cryptoWallet } = <{ cryptoWallet: any }>ctx.scene.state;

  const wallet_symbol = cryptoWallet?.symbol;
  const wallet_address = cryptoWallet?.address;

  // await ctx.editMessageText(
  //   `⬇️ Deposit\n\nUse the address below to send ${cryptoWallet.symbol} to the bot wallet. Funds will be credited within 30-60 minutes`,
  //   { parse_mode: "HTML" }
  // );

  // await ctx.reply(`<pre>${cryptoWallet.address}</pre>`, {
  //   parse_mode: "HTML",
  //   reply_markup: {
  //     inline_keyboard: [[{ text: "↩️ Back", callback_data: Routes.DEPOSIT }]],
  //   },
  // });
});
