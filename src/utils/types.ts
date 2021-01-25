import { DiscordUser } from "src/typeorm/entities/DiscordUser";
import { TwitchUser } from "src/typeorm/entities/TwitchUser";


export type DiscordUserDetails = BaseUserDetails & DiscordBaseUserDetails;
export interface DiscordBaseUserDetails {
  username: string;
  discriminator: string;
  identifier: string;
  avatar: string;
};

export type TwitchUserDetails = BaseUserDetails & TwitchBaseUserDetails;
export interface TwitchBaseUserDetails {
  username: string;
  identifier: string;
  displayName: string;
};
export interface BaseUserDetails {
  roles?: ChoobRole[];
  accessToken: string;
  refreshToken: string;
};
export enum ChoobRole {
  ADMIN,
  CHOOBQUOTE
};

export type Done = (err: Error, user: DiscordUser | TwitchUser) => void;