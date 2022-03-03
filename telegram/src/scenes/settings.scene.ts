import { Scene } from "@core";

export const settings = new Scene("settings");

settings.enter((ctx) => {
  ctx.reply(`⚙️ Settings\n\nLanguage: 🇬🇧 English`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Change Language", callback_data: "wallet" }],
        [{ text: "↩️ Back", callback_data: "start" }],
      ],
    },
  });
});
