import i18next, { i18n } from "i18next";
import { TelegramContext } from "types";
import fs from "fs";
import path from "path";

import en from "../../locales/en.json";
import ru from "../../locales/ru.json";

type LanguageCode = "en" | "ru";

const locales = { en, ru };

export class I18n {
  constructor() {}

  static async init(lng: LanguageCode = "en"): Promise<i18n> {
    try {
      const isLocale = locales[lng];

      const importLocale = (lng: LanguageCode) =>
        JSON.parse(`{ "${lng}": ${JSON.stringify(locales[lng])}}`);

      const loadLocale = (lng: LanguageCode) => {
        try {
          const localPath = path.resolve(__dirname, `./../locales/${lng}.json`);
          const locale = fs.readFileSync(localPath, { encoding: "utf8" });

          return JSON.parse(locale);
        } catch (e) {}
      };

      const resources = isLocale ? importLocale(lng) : importLocale("en");

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

  static t(key: string) {
    return i18next.t(key);
  }
}