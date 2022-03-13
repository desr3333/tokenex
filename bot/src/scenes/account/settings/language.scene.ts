import { Scene, Routes } from "@core";

export const scene = new Scene(Routes.ACCOUNT_SETTINGS_LANGUAGE);

scene.enter((ctx) => {
  ctx.editMessageText(`⚙️ Settings\n\nChoose Language:`, {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "🇬🇧", callback_data: "start" },
          { text: "🇷🇺", callback_data: "start" },
          { text: "🇩🇪", callback_data: "start" },
        ],
        [{ text: "↩️ Back", callback_data: Routes.ACCOUNT_SETTINGS }],
      ],
    },
  });
});
