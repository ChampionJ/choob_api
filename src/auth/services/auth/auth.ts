import { DiscordUser, TwitchUser } from '../../../typeorm';
import { DiscordUserDetails, TwitchUserDetails } from '../../../utils/types';

export interface AuthenticationProvider {
  validateDiscordUser(details: DiscordUserDetails);
  createDiscordUser(details: DiscordUserDetails);
  findDiscordUser(discordId: string): Promise<DiscordUser | undefined>;

  validateTwitchUser(details: TwitchUserDetails);
  createTwitchUser(details: TwitchUserDetails);
  findTwitchUser(twitchId: string): Promise<TwitchUser | undefined>;
}