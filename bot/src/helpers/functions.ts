import { CallbackQuery, Update } from "telegraf/typings/core/types/typegram";

export const selectFromArray = (array: any[], condition: object) => {
  if (!array) return [];

  const key = Object.keys(condition)[0];
  const value = Object.values(condition)[0];

  return array?.filter((item) => item[key] === value)?.[0] || null;
};
