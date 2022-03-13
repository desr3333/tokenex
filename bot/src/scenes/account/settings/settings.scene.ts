import { Scene, Routes } from "@core";

export const scene = new Scene(Routes.ACCOUNT_SETTINGS);

scene.enter((ctx) => {
  ctx.editMessageText(`⚙️ Settings\n\nLanguage: 🇬🇧 English`, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Change Language",
            callback_data: Routes.ACCOUNT_SETTINGS_LANGUAGE,
          },
        ],
        [{ text: "↩️ Back", callback_data: "start" }],
      ],
    },
  });
});
