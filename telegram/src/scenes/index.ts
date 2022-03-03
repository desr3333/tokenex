import { Stage } from "@core";
import { Scenes } from "telegraf";

import { start } from "./start.scene";
import { wallet } from "./wallet.scene";
import { settings } from "./settings.scene";

export const stage = new Scenes.Stage([start, wallet, settings]);
