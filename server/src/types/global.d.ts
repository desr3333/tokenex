declare namespace NodeJS {
  interface ProcessEnv {
    [key: string]: string | undefined;

    NODE_ENV: 'development' | 'production';
    PWD: string;
    PORT: number;
    DATABASE_URL: string;

    TELEGRAM_BOT_TOKEN: string;
    TELEGRAM_BOT_WEBHOOK: string;

    NOWNODES_API_KEY: string;

    ETH_NET: 'mainnet' | 'testnet';
    ETH_NODE_API_KEY: string;
    ETH_NODE_MAINNET: string;
    ETH_NODE_TESTNET: string;
    ETH_EXPLORER: string;

    BTC_NET: 'mainnet' | 'testnet';
    BTC_NODE_API_KEY: string;
    BTC_NODE_MAINNET: string;
    BTC_NODE_TESTNET: string;
    BTC_EXPLORER: string;

    COINBASE_API: string;
    COINBASE_EXCHANGE_API: string;
    COINBASE_EXCHANGE_KEY: string;
    COINBASE_EXCHANGE_PASSPHRASE: string;
    COINBASE_EXCHANGE_SECRET: string;

    COINDATA_API: string;
    COINDATA_API_KEY: string;
  }
}
