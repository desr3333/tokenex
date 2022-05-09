import { TelegramMiddleware } from "@types";
import {
  accountService,
  APIService,
  telegramAccountService,
  walletService,
} from "@services";
import { parseCallbackQuery, Routes, selectFromArray, Token } from "@helpers";

export const updateMiddleware: TelegramMiddleware = async (ctx, next) => {
  try {
    const id = ctx.chat.id;

    // Checking Server
    const server = await APIService.get("ping");
    if (!server) return ctx.reply("error:server_error");

    // Checking Telegram Account
    const _telegramAccount = await telegramAccountService.getById(id);
    ctx.session.telegramAccount = _telegramAccount;

    // Creating Telegram Account
    if (!_telegramAccount) {
      await ctx.reply("⌛️ Creating Account ..");

      const createdTelegramAccount = await telegramAccountService.create({
        id,
      });
      if (!createdTelegramAccount)
        return ctx.reply(ctx.t("error:account.not_created"));

      const telegramAccount = await telegramAccountService.getById(id);

      ctx.session.telegramAccount = telegramAccount;
      ctx.session.account = telegramAccount.account;

      await ctx.reply("👍️ Account Created!");
    }

    // Checking Account
    const account = ctx.session.telegramAccount?.account;
    const telegramAccount = ctx.session.telegramAccount;
    if (!account) {
      await telegramAccountService.remove(ctx.session.telegramAccount);
      ctx.session.telegramAccount = null;

      return ctx.reply(ctx.t("error:account.not_found"));
    }

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
