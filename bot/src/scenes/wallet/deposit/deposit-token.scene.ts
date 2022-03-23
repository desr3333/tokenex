import { Scene } from "@core";
import { routes } from "@helpers";

export const scene = new Scene(routes.DEPOSIT_TOKEN);

scene.enter(async (ctx) => {
  const { ETHWallet, USDTWallet } = ctx.session;
  const { token } = <{ token: string }>ctx.scene.state;

  let cryptoWallet;

  switch (token) {
    case "ETH":
      cryptoWallet = ETHWallet;
      break;
    case "USDT":
      cryptoWallet = USDTWallet;
      break;
  }

  if (!cryptoWallet) return;

  const { address, symbol } = cryptoWallet;

  await ctx.editMessageText(
    `⬇️ Deposit\n\nUse the address below to send ${symbol} to the bot wallet. Funds will be credited within 30-60 minutes`
  );

  await ctx.reply(`<pre>${address}</pre>`, {
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [[{ text: "↩️ Back", callback_data: routes.DEPOSIT }]],
    },
  });
});
