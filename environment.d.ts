declare namespace NodeJS {
  export interface ProcessEnv {
    TWITCH_USERNAME?: string;
    TWITCH_PASS?: string;
    TWITCH_CLIENT_ID?: string;
    TWITCH_CLIENT_SECRET?: string;
    TWITCH_CALLBACK_URL?: string;
    DB_USER?: string;
    DB_PASS?: string;
    DB_HOST?: string;
    DB_PORT?: string;
    DB_NAME?: string;
    PORT?: string;
    COOKIE_SECRET?: string;
    ENVIRONMENT: Environment;
    DISCORD_CLIENT_ID?: string;
    DISCORD_CLIENT_SECRET?: string;
    DISCORD_CALLBACK_URL?: string;
    REDIS_URI?: string;
  }
  export type Environment = 'DEVELOPMENT' | 'PRODUCTION' | 'TEST';
}