import { GuildInfo } from "passport-discord";
import { DiscordUser } from "src/structures/schemas/DiscordUser";
import { TwitchUser } from "src/structures/schemas/TwitchUser";


export type DiscordAuthUserDetails = BaseUserDetails & DiscordBaseUserDetails;
interface DiscordBaseUserDetails {
  username: string;
  discriminator: string;
  identifier: string;
  avatar: string;
};

export type TwitchAuthUserDetails = BaseUserDetails & TwitchBaseUserDetails;
interface TwitchBaseUserDetails {
  username: string;
  identifier: string;
  displayName: string;
};
interface BaseUserDetails {
  accessToken: string;
  refreshToken: string;
};

export type Done = (err: Error, user: DiscordUser | TwitchUser) => void;