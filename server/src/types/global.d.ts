declare namespace NodeJS {
  interface ProcessEnv {
    [key: string]: string | undefined;

    NODE_ENV: 'development' | 'production';
    PWD: string;

    DATABASE_URL: string;

    NOWNODES_API_KEY: string;

    COINDATA_API: string;
    COINDATA_API_KEY: string;

    ETH_NODE_API_KEY: string;
    ETH_NODE_PROVIDER: string;
    ETH_EXPLORER: string;

    BTC_NODE_API_KEY: string;
    BTC_NODE_PROVIDER: string;
    BTC_EXPLORER: string;

    TELEGRAM_BOT_TOKEN: string;
    TELEGRAM_BOT_WEBHOOK: string;

    COINBASE_API: string;
    COINBASE_EXCHANGE_API: string;
    COINBASE_EXCHANGE_KEY: string;
    COINBASE_EXCHANGE_PASSPHRASE: string;
    COINBASE_EXCHANGE_SECRET: string;
  }
}
