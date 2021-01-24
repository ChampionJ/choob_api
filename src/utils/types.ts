import { DiscordUser } from '../typeorm';
import { TwitchUser } from '../typeorm';

export type DiscordUserDetails = {
  username: string;
  discriminator: string;
  discordId: string;
  avatar: string;
  accessToken: string;
  refreshToken: string;
};
export type TwitchUserDetails = {
  username: string;
  twitchId: string;
  displayName: string;
  accessToken: string;
  refreshToken: string;
};

export type Done = (err: Error, user: DiscordUser | TwitchUser) => void;