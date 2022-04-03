import { Scene } from "@core";
import { Routes, keyboards } from "@helpers";

export const scene = new Scene(Routes.WALLET_START);

scene.enter((ctx) => {
  const { wallet, BTCWallet, ETHWallet, USDTWallet } = ctx.session;

  const round = (n: number, to?: number) => Number(n?.toFixed(to || 0)) || 0;

  const balances = {
    btc_wallet_balance: round(BTCWallet?.balance, 8),
    eth_wallet_balance: round(ETHWallet?.balance, 8),
    usdt_wallet_balance: round(USDTWallet?.balance, 8),
  };

  if (!ctx.message)
    return ctx.editMessageText(
      ctx.t("scene:wallet.start", { ...balances }),
      keyboards.wallet_main()
    );

  return ctx.reply(
    ctx.t("scene:wallet.start", { ...balances }),
    keyboards.wallet_main()
  );
});
