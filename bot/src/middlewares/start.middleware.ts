import { TelegramMiddleware } from "@types";
import {
  accountService,
  telegramAccountService,
  walletService,
} from "@services";
import { routes } from "@helpers";

export const startMiddleware: TelegramMiddleware = async (ctx, next) => {
  try {
    const { account } = ctx.session;

    if (!account) return next();

    console.log("Role ..");
    console.log({ account });
  } catch (e) {
    console.log(e.response?.data);
    next();
  }
};
