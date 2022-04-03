import { Scene } from "@core";
import { Routes, keyboards } from "@helpers";

export const scene = new Scene(Routes.DEPOSIT_ADDRESS);

scene.enter(async (ctx) => {
  const { cryptoWallet } = <{ cryptoWallet: any }>ctx.scene.state;

  const wallet_symbol = cryptoWallet?.symbol;
  const wallet_address = cryptoWallet?.address;

  if (!ctx.message) {
    await ctx.editMessageText(
      ctx.t("scene:wallet.deposit.wallet.hint", { wallet_symbol })
    );
    await ctx.replyWithMarkdown(
      ctx.t("scene:wallet.deposit.wallet.address", { wallet_address }),
      keyboards.back(Routes.DEPOSIT_WALLET)
    );

    return;
  }

  await ctx.reply(ctx.t("scene:wallet.deposit.wallet.hint", { wallet_symbol }));
  await ctx.replyWithMarkdown(
    ctx.t("scene:wallet.deposit.wallet.address", { wallet_address }),
    keyboards.back(Routes.DEPOSIT_WALLET)
  );
});
