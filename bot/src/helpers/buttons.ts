import { Markup } from "telegraf";
import { I18n } from "@core";

import { Routes } from "./routes";

export const back = (backScene?: string) =>
  Markup.button.callback(I18n.t("button:back"), backScene || Routes.MAIN);

export const cancel = (cancelScene?: string) =>
  Markup.button.callback(I18n.t("button:cancel"), cancelScene || Routes.MAIN);
