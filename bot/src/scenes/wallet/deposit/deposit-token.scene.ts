import { Scene } from "@core";
import { routes } from "@helpers";

export const scene = new Scene(routes.DEPOSIT_TOKEN);

scene.enter(async (ctx) => {
  const { ETHWallet, BTCWallet, USDTWallet } = ctx.session;
  const { token } = <{ token: string }>ctx.scene.state;

  let cryptoWallet;

  switch (token) {
    case "ETH":
      cryptoWallet = ETHWallet;
      break;
    case "BTC":
      cryptoWallet = BTCWallet;
      break;
    case "USDT":
      cryptoWallet = USDTWallet;
      break;
  }

  if (!cryptoWallet) return;

  const { address, symbol } = cryptoWallet;

  await ctx.editMessageText(
    `⬇️ Deposit\n\nUse the address below to send ${symbol} to the bot wallet. Funds will be credited within 30-60 minutes`,
    { parse_mode: "HTML" }
  );

  await ctx.reply(`<pre>${address}</pre>`, {
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [[{ text: "↩️ Back", callback_data: routes.DEPOSIT }]],
    },
  });

  setTimeout(() => {
    ctx.reply(
      `✅ Deposit Confirmed!\n\nFrom: <pre>*****${address.slice(
        -8
      )}</pre>\nTo: <pre>*****${address.slice(
        -8
      )}</pre>\nValue: <pre>0.005 ${symbol}</pre>\nStatus: Confirmed\n\n`,
      {
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Explore Transaction",
                url: "https://rinkeby.etherscan.io/tx/0xf7f276b4ebb56e0ac4566ee9774af5ec4b99d9584b31b6080b5749e003e86e16",
              },
            ],
          ],
        },
      }
    );
  }, 5000);
});
