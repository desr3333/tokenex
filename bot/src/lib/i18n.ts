import i18next, { i18n } from "i18next";
import { TelegramContext } from "types";

import en from "./../locales/en.json";
import ru from "./../locales/ru.json";

type LanguageCode = "en" | "ru";

const locales = { en, ru };

export class I18n {
  constructor() {}

  static async init(lng: LanguageCode = "en"): Promise<i18n> {
    try {
      const isLocale = locales[lng];

      const localeToJSON = (lng: LanguageCode) =>
        `{ "${lng}": ${JSON.stringify(locales[lng])}}`;

      const resources = isLocale
        ? JSON.parse(localeToJSON(lng))
        : localeToJSON("en");

      await i18next.init({
        lng,
        resources,
        defaultNS: "translation",
        keySeparator: ".",
      });

      return i18next;
    } catch (e) {
      console.log({ e });
    }
  }

  static middleware() {
    return async (ctx: TelegramContext, next: Function) => {
      // @ts-ignore
      const languageCode: LanguageCode = ctx.from?.language_code || "en";

      ctx.i18n = await this.init(languageCode);

      return next();
    };
  }
}
