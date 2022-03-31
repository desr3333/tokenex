import { Scene } from "@core";
import { Routes, keyboards } from "@helpers";

export const scene = new Scene(Routes.WALLET_START);

scene.enter((ctx) => {
  const { wallet, BTCWallet, ETHWallet, USDTWallet } = ctx.session;

  const balances = {
    btc_wallet_balance: BTCWallet?.balance || 0,
    eth_wallet_balance: ETHWallet?.balance || 0,
    usdt_wallet_balance: USDTWallet?.balance || 0,
  };

  if (!ctx.message)
    return ctx.editMessageText(
      ctx.t("scene:wallet.main", { ...balances }),
      keyboards.wallet_main()
    );

  return ctx.reply(
    ctx.t("scene:wallet.main", { ...balances }),
    keyboards.wallet_main()
  );
});
