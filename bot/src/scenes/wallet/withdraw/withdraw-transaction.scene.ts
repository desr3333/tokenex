import { Scene } from "@core";
import { keyboards, Routes } from "@helpers";

export const scene = new Scene(Routes.WITHDRAW_TRANSACTION);

scene.enter(async (ctx) => {
  const { transaction } = ctx.session;
  const status = ctx.t(`status:pending`);

  const vars = {
    ...transaction,
    symbol: transaction.cryptoWallet?.symbol,
    status,
  };

  if (!ctx.message)
    return ctx.editMessageText(
      ctx.t("scene:wallet.withdraw.transaction", vars),
      keyboards.wallet_transaction(vars)
    );

  return ctx.reply(
    ctx.t("scene:wallet.withdraw.transaction", vars),
    keyboards.wallet_transaction(vars)
  );
});
