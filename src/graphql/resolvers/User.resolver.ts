import {
  createParamDecorator,
  ExecutionContext,
  Inject,
  UseGuards,
} from '@nestjs/common';
import {
  Args,
  GqlExecutionContext,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GraphQLAuthGuard, GraphQLDiscordAuthGuard, GraphQLTwitchAuthGuard } from 'src/auth/utils/Guards';
import { AuthenticationProvider } from 'src/auth/services/auth/auth';
import { DiscordService } from 'src/discord/discord.service';
import { DiscordProvider } from 'src/discord/discord';
import { TwitchProvider } from 'src/twitch/twitch';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TwitchCustomCommandDocument } from 'src/structures/schemas/TwitchCustomCommands';
import { DiscordUser, DiscordUserDocument } from 'src/structures/schemas/DiscordUser';
import { TwitchUser, TwitchUserDocument } from 'src/structures/schemas/TwitchUser';
import { AuthType } from 'src/structures/interfaces/IUser';
import { User } from 'src/structures/schemas/User';


export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);

@Resolver('User')
@UseGuards(GraphQLAuthGuard)
export class UserResolver {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authService: AuthenticationProvider,
  ) { }
  // @ResolveField()
  // __resolveType(value) {
  //   console.log("res field")
  //   if (value.authType === 'Twitch') {
  //     const { TwitchUser } = require('src/structures/schemas/TwitchUser')
  //     return TwitchUser;
  //   }
  //   if (value.authType === 'Discord') {
  //     const { DiscordUser } = require('src/structures/schemas/DiscordUser')
  //     return DiscordUser;
  //   }
  //   return null;
  // }

  @Query('getUser')
  async getUser(@CurrentUser() user: User): Promise<User> {
    console.log("user");
    console.log(user);
    return user;
  }
  @Query('getTest')
  async getTest(): Promise<String> {
    return "test";
  }



}

@Resolver('DiscordUser')
@UseGuards(GraphQLDiscordAuthGuard)
export class DiscordUserResolver {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authService: AuthenticationProvider,
    @Inject('DISCORD_SERVICE')
    private readonly discordService: DiscordProvider,
    @InjectModel(DiscordUser.name) private discordUserRepo: Model<DiscordUserDocument>,
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
@UseGuards(GraphQLTwitchAuthGuard)
export class TwitchUserResolver {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authService: AuthenticationProvider,
    @Inject('TWITCH_SERVICE')
    private readonly twitchService: TwitchProvider,
    @InjectModel(TwitchUser.name) private twitchUserRepo: Model<TwitchUserDocument>,
  ) { }

  @Query('getTwitchUser')
  async getTwitchUser(@CurrentUser() user: TwitchUser): Promise<TwitchUser> {
    console.log(user);
    return user;
  }
  @Query('getTwitchUserById')
  async getTwitchUserById(@Args('id') id: string): Promise<TwitchUser> {
    console.log(id);
    const founduser = await this.twitchUserRepo.findOne({ authType: AuthType.TwitchUser, identifier: id });
    console.log(founduser);
    return founduser;
  }
  @ResolveField()
  async editorInChannels(@Parent() user: TwitchUser) {
    console.log(user);
    console.log('Guilds Resolve Field');
    // TODO Search TwitchChannelEditors collection based on userId, to get all the channelId's
    // If there is a channel config for the user's channel, return that too? 
    // If it's not there, means bot has never been in their channel, and we'll need a "add bot to channel" popup
    // Or, we can just make one, and don't have the bot join. But that'd be a lot of processing we probably don't
    // want to just do automatically in here
    return null;
  }
}