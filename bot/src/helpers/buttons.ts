import { Markup } from "telegraf";
import { I18n } from "@core";

export const back = (back?: string) =>
  Markup.button.callback(I18n.t("button:back"), back || "back");
