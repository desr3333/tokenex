import { Stage } from "@core";
import { Scenes } from "telegraf";

import * as start from "./start.scene";

import * as account from "./account";
import * as wallet from "./wallet";
import * as dashboard from "./dashboard";
import * as settings from "./settings";

export const stage = new Stage([
  start.scene,

  wallet.start.scene,

  wallet.deposit.start.scene,
  wallet.deposit.wallet.scene,
  wallet.deposit.address.scene,

  wallet.withdraw.start.scene,
  wallet.withdraw.wallet.scene,
  wallet.withdraw.amount.scene,
  wallet.withdraw.address.scene,
  wallet.withdraw.confirm.scene,
  wallet.withdraw.transaction.scene,
  wallet.withdraw.failed.scene,

  wallet.exchange.start.scene,

  account.start.scene,
  account.settings.start.scene,
  account.settings.language.scene,

  dashboard.start.scene,
  dashboard.stats.start.scene,

  settings.start.scene,
  settings.bot.start.scene,
  settings.token.start.scene,
]);
