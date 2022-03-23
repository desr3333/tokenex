import { TelegramMiddleware } from "@types";
import {
  accountService,
  telegramAccountService,
  walletService,
} from "@services";

export const accountMiddleware: TelegramMiddleware = async (ctx, next) => {
  try {
    const chatId = ctx.chat.id;

    // Checking Telegram Account
    const telegramAccount = await telegramAccountService.getByChatId(chatId);

    ctx.session.telegramAccount = telegramAccount;
    ctx.session.account = telegramAccount?.account;

    // Creating Telegram Account
    if (!telegramAccount) {
      await ctx.reply("Creating Account ..");

      const telegramAccount = await telegramAccountService.create({ chatId });
      // const telegramAccount = await telegramAccountService.getByChatId(chatId);

      if (!telegramAccount) return ctx.reply("❌ Account Not Created!");

      ctx.session.telegramAccount = telegramAccount;
      ctx.session.account = telegramAccount.account;

      await ctx.reply("👍️ Account Created!");
    }

    // Checking Wallet
    const { account } = ctx.session;

    const walletId = account?.walletId;
    if (!walletId) return ctx.reply("❌ Wallet Not Created!");

    const wallet = await walletService.getById(walletId);
    const cryptoWallets = wallet?.cryptoWallets || [];

    const _select = (symbol: string, wallets: any[]) => {
      return wallets?.filter((w) => w.symbol === symbol)?.[0] || null;
    };

    ctx.session.wallet = wallet;
    ctx.session.ETHWallet = _select("ETH", cryptoWallets);
    ctx.session.USDTWallet = _select("USDT", cryptoWallets);

    next();
  } catch (e) {
    console.log({ e });
  }
};
