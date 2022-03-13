import { Routes, Scene } from "@core";

export const scene = new Scene(Routes.DEPOSIT_TOKEN);

scene.enter(async (ctx) => {
  const { token } = ctx.session;

  await ctx.editMessageText(
    `⬇️ Deposit\n\nUse the address below to send ${token?.toUpperCase()} to the bot wallet. Funds will be credited within 30-60 minutes`
  );

  await ctx.reply("```1JMoFCsPCeaCgxLhvSqJBj9btCKdedSMKF```", {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [[{ text: "↩️ Back", callback_data: Routes.WALLET }]],
    },
  });
});
