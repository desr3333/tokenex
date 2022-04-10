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
  }
}
