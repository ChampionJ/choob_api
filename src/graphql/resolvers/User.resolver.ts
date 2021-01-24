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
import { DiscordUser, TwitchCustomCommand, TwitchUser } from 'src/typeorm';
import { DiscordService } from 'src/discord/discord.service';
import { DiscordProvider } from 'src/discord/discord';
import { TwitchProvider } from 'src/twitch/twitch';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TwitchCustomCommandDocument } from 'src/typeorm/entities/TwitchCustomCommands';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);

@Resolver('DiscordUser')
@UseGuards(GraphQLAuthGuard)
export class DiscordUserResolver {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authService: AuthenticationProvider,
    @Inject('DISCORD_SERVICE')
    private readonly discordService: DiscordProvider
  ) { }

  @Query('getDiscordUser')
  async getDiscordUser(@CurrentUser() user: DiscordUser): Promise<DiscordUser> {
    console.log(user);
    return user;
  }

  @ResolveField()
  async guilds(@Parent() user: DiscordUser) {
    console.log(user);
    console.log('Guilds Resolve Field');
    return this.discordService.fetchGuilds(user.accessToken);
  }
}

@Resolver('TwitchUser')
@UseGuards(GraphQLAuthGuard)
export class TwitchUserResolver {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authService: AuthenticationProvider,
    @Inject('TWITCH_SERVICE')
    private readonly twitchService: TwitchProvider,
    @InjectModel(TwitchCustomCommand.name)
    private twitchCustomCommandModel: Model<TwitchCustomCommandDocument>
  ) { }

  @Query('getTwitchUser')
  async getTwitchUser(@CurrentUser() user: TwitchUser): Promise<TwitchUser> {
    console.log(user);
    return user;
  }

  @Query('getCommands')
  async getCommands(): Promise<TwitchCustomCommand[]> {
    return this.twitchCustomCommandModel.find({}).exec();
  }
}