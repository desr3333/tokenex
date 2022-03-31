import { Markup } from "telegraf";

import { I18n } from "@core";
import { Routes, buttons } from "@helpers";
import { Token } from "./enums";

const { SUPPORT } = process.env;

export const main = () =>
  Markup.inlineKeyboard([
    [
      {
        text: I18n.t("button:wallet.wallet"),
        callback_data: Routes.WALLET_START,
      },
      // { text: I18n.t("button:wallet.transactions"), callback_data: "_" },
    ],
    [
      { text: I18n.t("button:support.support"), url: SUPPORT },
      {
        text: I18n.t("button:account.settings.settings"),
        callback_data: Routes.ACCOUNT_SETTINGS,
      },
    ],
  ]);

export const back = (backScene?: string) =>
  Markup.inlineKeyboard([[buttons.back(backScene)]]);

export const cancel = (backScene?: string) =>
  Markup.inlineKeyboard([[buttons.cancel(backScene)]]);

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
        callback_data: Routes.ACCOUNT_SETTINGS_LANGUAGE,
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

export const wallet_main = () =>
  Markup.inlineKeyboard([
    [
      {
        text: I18n.t("button:wallet.deposit.deposit"),
        callback_data: Routes.DEPOSIT_START,
      },
      {
        text: I18n.t("button:wallet.withdraw.withdraw"),
        callback_data: Routes.WITHDRAW_START,
      },
    ],
    [
      {
        text: I18n.t("button:wallet.exchange.exchange"),
        callback_data: Routes.EXCHANGE,
      },
    ],
    [buttons.back(Routes.MAIN)],
  ]);

export const wallet_deposit_wallet = () =>
  Markup.inlineKeyboard([
    [
      {
        text: Token.BTC,
        callback_data: Routes.DEPOSIT_WALLET_SELECT(Token.BTC),
      },
      {
        text: Token.ETH,
        callback_data: Routes.DEPOSIT_WALLET_SELECT(Token.ETH),
      },
      {
        text: Token.USDT,
        callback_data: Routes.DEPOSIT_WALLET_SELECT(Token.USDT),
      },
    ],
    [{ text: I18n.t("button:back"), callback_data: Routes.WALLET_START }],
  ]);

export const wallet_withdraw_wallet = () =>
  Markup.inlineKeyboard([
    [
      {
        text: Token.BTC,
        callback_data: Routes.WITHDRAW_WALLET_SELECT(Token.BTC),
      },
      {
        text: Token.ETH,
        callback_data: Routes.WITHDRAW_WALLET_SELECT(Token.ETH),
      },
      {
        text: Token.USDT,
        callback_data: Routes.WITHDRAW_WALLET_SELECT(Token.USDT),
      },
    ],
    [{ text: I18n.t("button:back"), callback_data: Routes.WALLET_START }],
  ]);

export const wallet_withdraw_cancel = () =>
  Markup.inlineKeyboard([[buttons.cancel(Routes.WITHDRAW_START)]]);
