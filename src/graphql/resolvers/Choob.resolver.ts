import {
  createParamDecorator,
  ExecutionContext,
  Inject,
  UseGuards,
} from '@nestjs/common';
import {
  GqlExecutionContext,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GraphQLAuthGuard } from 'src/auth/utils/Guards';
import { AuthenticationProvider } from 'src/auth/services/auth/auth';

import { DiscordService } from 'src/discord/discord.service';
import { DiscordProvider } from 'src/discord/discord';
import { TwitchProvider } from 'src/twitch/twitch';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TwitchCustomCommand, TwitchCustomCommandDocument } from 'src/structures/schemas/TwitchCustomCommands';
import { CurrentUser } from './User.resolver';

@Resolver('Choob')
@UseGuards(GraphQLAuthGuard)
export class ChoobResolver {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authService: AuthenticationProvider,
    @Inject('DISCORD_SERVICE')
    private readonly discordService: DiscordProvider,
    @Inject('TWITCH_SERVICE')
    private readonly twitchService: TwitchProvider,
    @InjectModel(TwitchCustomCommand.name)
    private twitchCustomCommandModel: Model<TwitchCustomCommandDocument>
  ) { }

  // @Query('getDiscordUser')
  // async getDiscordUser(@CurrentUser() user: DiscordUser): Promise<DiscordUser> {
  //   console.log(user);
  //   return user;
  // }

  // @ResolveField()
  // async guilds(@Parent() user: DiscordUser) {
  //   console.log(user);
  //   console.log('Guilds Resolve Field');
  //   return this.discordService.fetchGuilds(user.accessToken);
  // }

  @Query('getCommands')
  async getCommands(): Promise<TwitchCustomCommand[]> {
    return this.twitchCustomCommandModel.find({}).exec();
  }

}
