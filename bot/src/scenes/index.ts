import { Stage } from "@core";
import { Scenes } from "telegraf";

import * as start from "./main.scene";
import * as wallet from "./wallet/wallet.scene";

import * as deposit from "./wallet/deposit/deposit.scene";
import * as depositToken from "./wallet/deposit/deposit-token.scene";

import * as withdraw from "./wallet/withdraw/withdraw.scene";
import * as exchange from "./wallet/exchange/exchange.scene";

import * as settings from "./account/settings/settings.scene";
import * as language from "./account/settings/language.scene";

export const stage = new Stage([
  start.scene,
  wallet.scene,

  settings.scene,
  language.scene,

  deposit.scene,
  depositToken.scene,

  withdraw.scene,
  exchange.scene,
]);
