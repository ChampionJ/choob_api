
import { AuthType } from 'src/structures/interfaces/IUser';
import { DiscordUser } from 'src/structures/schemas/DiscordUser';
import { TwitchUser } from 'src/structures/schemas/TwitchUser';
import { DiscordAuthUserDetails, TwitchAuthUserDetails } from '../../../utils/types';

export interface AuthenticationProvider {
  validateDiscordUser(details: DiscordAuthUserDetails);
  createDiscordUser(details: DiscordAuthUserDetails);
  findDiscordUser(discordId: string): Promise<DiscordUser | undefined>;

  validateTwitchUser(details: TwitchAuthUserDetails);
  createTwitchUser(details: TwitchAuthUserDetails);
  findTwitchUser(twitchId: string): Promise<TwitchUser | undefined>;

  findUser(authType: AuthType, twitchId: string): Promise<TwitchUser | DiscordUser | undefined>;
}