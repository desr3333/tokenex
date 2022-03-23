import { Markup } from "telegraf";

import { I18n } from "@core";
import { routes, buttons } from "@helpers";

const { SUPPORT } = process.env;

export const main = () =>
  Markup.inlineKeyboard([
    [
      { text: I18n.t("button:wallet.wallet"), callback_data: routes.WALLET },
      { text: I18n.t("button:wallet.transactions"), callback_data: "_" },
    ],
    [
      { text: I18n.t("button:support.support"), url: SUPPORT },
      {
        text: I18n.t("button:account.settings.settings"),
        callback_data: routes.ACCOUNT_SETTINGS,
      },
    ],
  ]);

export const dashboard = () =>
  Markup.inlineKeyboard([
    [
      { text: I18n.t("button:dashboard.stats"), callback_data: "-" },
      { text: I18n.t("button:wallet.transactions"), callback_data: "-" },
    ],
    [
      {
        text: I18n.t("button:bot.settings"),
        callback_data: "-",
      },
    ],
  ]);

/*
 ** Account
 */

export const account_settings = () =>
  Markup.inlineKeyboard([
    [
      {
        text: I18n.t("button:account.settings.language.edit"),
        callback_data: routes.ACCOUNT_SETTINGS_LANGUAGE,
      },
    ],
    [buttons.back()],
  ]);

export const account_settings_language = () =>
  Markup.inlineKeyboard([
    [
      {
        text: I18n.t("button:language.english"),
        callback_data: "back",
      },
      {
        text: I18n.t("button:language.russian"),
        callback_data: "back",
      },
      {
        text: I18n.t("button:language.german"),
        callback_data: "back",
      },
    ],
    [buttons.back()],
  ]);

/*
 ** Wallet
 */

export const wallet_main = (back?: string) =>
  Markup.inlineKeyboard([
    [
      { text: "⬇️ Deposit", callback_data: routes.DEPOSIT },
      { text: "⬆️ Withdraw", callback_data: routes.WITHDRAW },
    ],
    [{ text: "♻️ Exchange", callback_data: routes.EXCHANGE }],
    [buttons.back(back)],
  ]);
