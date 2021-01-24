
import { DiscordUser, DiscordUserSchema } from './entities/DiscordUser';
import { TwitchCustomCommand, TwitchCustomCommandInfo, TwitchCustomCommandModel } from './entities/TwitchCustomCommands';
import { TwitchUser, TwitchUserSchema } from './entities/TwitchUser';


export const entities = [DiscordUser, TwitchUser];

export {
  DiscordUser, TwitchUser, DiscordUserSchema, TwitchUserSchema, TwitchCustomCommand, TwitchCustomCommandInfo, TwitchCustomCommandModel
};