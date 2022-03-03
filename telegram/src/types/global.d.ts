declare namespace NodeJS {
  interface ProcessEnv {
    [key: string]: string | undefined;

    NODE_ENV: "development" | "production";
    PWD: string;

    PORT?: string;
    BOT_TOKEN?: string;
    SUPPORT?: string;
  }
}
