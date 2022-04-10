import { TelegramMiddleware } from "@types";
import {
  accountService,
  telegramAccountService,
  walletService,
} from "@services";
import { parseCallbackQuery, Routes, selectFromArray, Token } from "@helpers";

export const updateMiddleware: TelegramMiddleware = async (ctx, next) => {
  try {
    const chatId = ctx.chat.id;

    // Checking Telegram Account
    const _telegramAccount = await telegramAccountService.getByChatId(chatId);
    ctx.session.telegramAccount = _telegramAccount;

    // // Creating Telegram Account
    if (!_telegramAccount) {
      await ctx.reply("⌛️ Creating Account ..");

      const telegramAccount = await telegramAccountService.create({ chatId });
      if (!telegramAccount)
        return ctx.reply(ctx.t("error:account.not_created"));

      ctx.session.telegramAccount = telegramAccount;
      ctx.session.account = telegramAccount.account;

      await ctx.reply("👍️ Account Created!");
    }

    // Checking Account
    const { telegramAccount } = ctx.session;

    const account = telegramAccount?.account;
    if (!account) return ctx.reply(ctx.t("error:account.not_found"));

    // Checking Wallet
    const wallet = await walletService.getById(account.walletId);
    if (!wallet) return ctx.reply(ctx.t("error:wallet.not_found"));

    // Validating
    if (account?.banned) return ctx.reply(ctx.t("error:account:banned"));

    // Checking Crypto Wallets
    const cryptoWallets = wallet?.cryptoWallets || [];

    const BTCWallet = selectFromArray(cryptoWallets, {
      symbol: Token.BTC,
    });
    const ETHWallet = selectFromArray(cryptoWallets, {
      symbol: Token.ETH,
    });
    const USDTWallet = selectFromArray(cryptoWallets, {
      symbol: Token.USDT,
    });

    // Updating Session
    ctx.session.telegramAccount = telegramAccount;
    ctx.session.account = account;
    ctx.session.wallet = wallet;
    ctx.session.BTCWallet = BTCWallet;
    ctx.session.ETHWallet = ETHWallet;
    ctx.session.USDTWallet = USDTWallet;

    next();
  } catch (e) {
    ctx.reply("Server Error");
    console.log({ e });
  }
};

export const handleTextMessage: TelegramMiddleware = (ctx) => {
  const data = parseCallbackQuery(ctx.callbackQuery);

  return ctx.scene.enter(data).catch((e) => {
    console.log({ e });
    ctx.scene.enter(Routes.START);
  });
};

export const handleCallbackQuery: TelegramMiddleware = (ctx) => {
  const data = parseCallbackQuery(ctx.callbackQuery);

  return ctx.scene.enter(data).catch((e) => {
    console.log({ e });
    ctx.scene.enter(Routes.START);
  });
};
