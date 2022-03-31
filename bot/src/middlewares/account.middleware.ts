import { TelegramMiddleware } from "@types";
import {
  accountService,
  telegramAccountService,
  walletService,
} from "@services";
import { selectFromArray, Token } from "@helpers";

export const accountMiddleware: TelegramMiddleware = async (ctx, next) => {
  try {
    const chatId = ctx.chat.id;

    // Checking Telegram Account
    const telegramAccount = await telegramAccountService.getByChatId(chatId);

    // console.log({ telegramAccount });

    ctx.session.account = telegramAccount?.account;

    // Creating Telegram Account
    if (!telegramAccount) {
      await ctx.reply("⌛️ Creating Account ..");

      //  console.log("Creating..");

      const telegramAccount = await telegramAccountService.create({ chatId });
      if (!telegramAccount) return ctx.reply("❌ Account Not Created!");

      ctx.session.telegramAccount = telegramAccount;
      ctx.session.account = telegramAccount.account;

      await ctx.reply("👍️ Account Created!");
    }

    // Checking Account
    const { account } = ctx.session;

    if (account.banned) return ctx.reply(`❌ Error!\n\nYou've been banned.`);

    // Checking Wallet
    const walletId = account?.walletId;
    if (!walletId) return ctx.reply("❌ Wallet Not Created!");

    const wallet = await walletService.getById(walletId);

    console.log("Updating Walllet ..");

    ctx.session.wallet = wallet;

    const BTCWallet = selectFromArray(wallet?.cryptoWallets, {
      symbol: Token.BTC,
    });
    const ETHWallet = selectFromArray(wallet?.cryptoWallets, {
      symbol: Token.ETH,
    });
    const USDTWallet = selectFromArray(wallet?.cryptoWallets, {
      symbol: Token.USDT,
    });

    console.log({ ETHWallet });

    next();
  } catch (e) {
    ctx.reply("Server Error");
  }
};
