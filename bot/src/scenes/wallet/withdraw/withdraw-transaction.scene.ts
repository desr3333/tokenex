import { Scene } from "@core";
import { keyboards, Routes } from "@helpers";

export const scene = new Scene(Routes.WITHDRAW_TRANSACTION);

scene.enter(async (ctx) => {
  const { transaction } = ctx.session;
  const { from, to, input, output, fee } = transaction;

  const vars = {
    ...transaction,
    symbol: transaction.cryptoWallet?.symbol,
    status: ctx.t(`status:pending`),
    from,
    to,
    input,
    output,
    fee,
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
