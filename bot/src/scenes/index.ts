import { Stage } from "@core";
import { Scenes } from "telegraf";

import * as start from "./main.scene";

import * as wallet from "./wallet";

import * as settings from "./account/settings/settings.scene";
import * as language from "./account/settings/language.scene";

import * as dashboard from "./dashboard";

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
  wallet.withdraw.fulfilled.scene,
  wallet.withdraw.failed.scene,

  wallet.exchange.start.scene,

  settings.scene,
  language.scene,

  dashboard.start.scene,
]);
