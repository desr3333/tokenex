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
  wallet.deposit.token.scene,
  wallet.withdraw.start.scene,
  wallet.exchange.start.scene,

  settings.scene,
  language.scene,

  dashboard.start.scene,
]);
