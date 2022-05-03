import { Markup } from "telegraf";

import { I18n } from "@core";
import { Routes, buttons } from "@helpers";
import { Token } from "./enums";
import { TransactionDto } from "types";

const { SUPPORT } = process.env;

// Start
export const start = ({ isAdmin }: { isAdmin: boolean }) =>
  Markup.inlineKeyboard([
    [
      {
        text: I18n.t("button:wallet"),
        callback_data: Routes.WALLET_START,
      },
    ],
    [
      { text: I18n.t("button:support"), url: SUPPORT },
      {
        text: I18n.t("button:account"),
        callback_data: Routes.ACCOUNT_START,
      },
    ],

    isAdmin
      ? [
          {
            text: I18n.t("button:dashboard"),
            callback_data: Routes.DASHBOARD_START,
          },
        ]
      : [],
  ]);

// Dashboard
export const dashboard = {
  start: () =>
    Markup.inlineKeyboard([
      [
        {
          text: I18n.t("button:stats"),
          callback_data: Routes.DASHBOARD_STATS_START,
        },
        {
          text: I18n.t("button:settings"),
          callback_data: Routes.SETTINGS_START,
        },
      ],
      [buttons.back(Routes.START)],
    ]),

  stats: {
    start: () =>
      Markup.inlineKeyboard([[buttons.back(Routes.DASHBOARD_START)]]),
  },
};

// Settings
export const settings = {
  start: () =>
    Markup.inlineKeyboard([
      [
        {
          text: I18n.t("button:bot"),
          callback_data: Routes.SETTINGS_BOT_START,
        },
      ],
      [
        {
          text: Token.BTC,
          callback_data: Routes.SETTINGS_TOKEN__SELECT(Token.BTC),
        },
        {
          text: Token.ETH,
          callback_data: Routes.SETTINGS_TOKEN__SELECT(Token.ETH),
        },
        {
          text: Token.USDT,
          callback_data: Routes.SETTINGS_TOKEN__SELECT(Token.USDT),
        },
      ],
      [buttons.back(Routes.DASHBOARD_START)],
    ]),

  token: {
    start: () =>
      Markup.inlineKeyboard([
        [
          {
            text: I18n.t("button:address"),
            callback_data: Routes.SETTINGS_TOKEN_FEE_ADDRESS,
          },
        ],
        [
          {
            text: I18n.t("button:deposit_fee"),
            callback_data: Routes.SETTINGS_TOKEN_FEE_DEPOSIT,
          },
          {
            text: I18n.t("button:withdraw_fee"),
            callback_data: Routes.SETTINGS_TOKEN_FEE_WITHDRAW,
          },
        ],
        [buttons.back(Routes.SETTINGS_START)],
      ]),
  },
};

// Account

export const account = {
  start: () =>
    Markup.inlineKeyboard([
      // [
      //   {
      //     text: I18n.t("button:settings"),
      //     callback_data: Routes.ACCOUNT_SETTINGS_START,
      //   },
      // ],
      [buttons.back(Routes.START)],
    ]),
  settings: {
    start: () =>
      Markup.inlineKeyboard([
        [
          {
            text: I18n.t("button:account.settings.language.edit"),
            callback_data: Routes.ACCOUNT_SETTINGS_LANGUAGE,
          },
        ],
        [buttons.back(Routes.ACCOUNT_START)],
      ]),
    language: () =>
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
      ]),
  },
};

/*
 ** Wallet
 */

export const wallet_main = () =>
  Markup.inlineKeyboard([
    [
      {
        text: I18n.t("button:deposit"),
        callback_data: Routes.DEPOSIT_START,
      },
      {
        text: I18n.t("button:withdraw"),
        callback_data: Routes.WITHDRAW_START,
      },
    ],
    [
      {
        text: I18n.t("button:exchange"),
        callback_data: Routes.EXCHANGE,
      },
    ],
    [
      {
        text: I18n.t("button:deposit_with_card"),
        callback_data: "-",
      },
    ],
    [buttons.back(Routes.START)],
  ]);

export const wallet_transaction = ({ explorerLink }: TransactionDto) =>
  Markup.inlineKeyboard([
    explorerLink
      ? [
          {
            text: I18n.t("button:transaction"),
            url: explorerLink,
          },
        ]
      : [],
    [
      {
        text: I18n.t("button:back_to_wallet"),
        callback_data: Routes.WALLET_START,
      },
    ],
  ]);

export const wallet_deposit_wallet = () =>
  Markup.inlineKeyboard([
    [
      {
        text: Token.BTC,
        callback_data: Routes.DEPOSIT_WALLET__SELECT(Token.BTC),
      },
      {
        text: Token.ETH,
        callback_data: Routes.DEPOSIT_WALLET__SELECT(Token.ETH),
      },
      // {
      //   text: Token.USDT,
      //   callback_data: Routes.DEPOSIT_WALLET__SELECT(Token.USDT),
      // },
    ],
    [buttons.back(Routes.WALLET_START)],
  ]);

export const wallet_withdraw_wallet = () =>
  Markup.inlineKeyboard([
    [
      {
        text: Token.BTC,
        callback_data: Routes.WITHDRAW__WALLET_SELECT(Token.BTC),
      },
      {
        text: Token.ETH,
        callback_data: Routes.WITHDRAW__WALLET_SELECT(Token.ETH),
      },
      // {
      //   text: Token.USDT,
      //   callback_data: Routes.WITHDRAW__WALLET_SELECT(Token.USDT),
      // },
    ],
    [buttons.back(Routes.WALLET_START)],
  ]);

export const wallet_withdraw_confirm = () =>
  Markup.inlineKeyboard([
    [
      {
        text: I18n.t("button:cancel"),
        callback_data: Routes.WITHDRAW__CANCEL,
      },
      {
        text: I18n.t("button:confirm"),
        callback_data: Routes.WITHDRAW__CONFIRM,
      },
    ],
  ]);

export const wallet_withdraw_cancel = () =>
  Markup.inlineKeyboard([[buttons.cancel(Routes.WITHDRAW_START)]]);

// Generic Keyboards
export const back = (backScene?: string) =>
  Markup.inlineKeyboard([[buttons.back(backScene)]]);

export const cancel = (backScene?: string) =>
  Markup.inlineKeyboard([[buttons.cancel(backScene)]]);

export const wallet_exchange_wallet_from = () =>
  Markup.inlineKeyboard([
    [
      {
        text: Token.BTC,
        callback_data: Routes.EXCHANGE_WALLET_FROM__SELECT(Token.BTC),
      },
      {
        text: Token.ETH,
        callback_data: Routes.EXCHANGE_WALLET_FROM__SELECT(Token.ETH),
      },
      // {
      //   text: Token.USDT,
      //   callback_data: Routes.DEPOSIT_WALLET__SELECT(Token.USDT),
      // },
    ],
    [buttons.back(Routes.WALLET_START)],
  ]);

export const wallet_exchange_wallet_to = () =>
  Markup.inlineKeyboard([
    [
      {
        text: Token.BTC,
        callback_data: Routes.EXCHANGE_WALLET_TO__SELECT(Token.BTC),
      },
      {
        text: Token.ETH,
        callback_data: Routes.EXCHANGE_WALLET_TO__SELECT(Token.ETH),
      },
    ],
    [buttons.back(Routes.WALLET_START)],
  ]);

export const wallet_exchange_amount = () =>
  Markup.inlineKeyboard([
    [
      {
        text: I18n.t("button:cancel"),
        callback_data: Routes.EXCHANGE__CANCEL,
      },
    ],
  ]);

export const wallet_exchange_confirm = () =>
  Markup.inlineKeyboard([
    [
      {
        text: I18n.t("button:cancel"),
        callback_data: Routes.EXCHANGE__CANCEL,
      },
      {
        text: I18n.t("button:confirm"),
        callback_data: Routes.EXCHANGE__CONFIRM,
      },
    ],
  ]);
