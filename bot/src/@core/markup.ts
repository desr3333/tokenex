import { InlineKeyboardButton } from "telegraf/typings/core/types/typegram";
import { ExtraReplyMessage } from "telegraf/typings/telegram-types";

export const createInlineKeyboard = (): ExtraReplyMessage => {
  const inline_keyboard: InlineKeyboardButton[][] = [
    [
      {
        text: "",
        callback_data: "",
      },
    ],
  ];

  return { reply_markup: { inline_keyboard } };
};
