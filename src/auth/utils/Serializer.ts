import { PassportSerializer } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { DiscordUser, TwitchUser } from '../../typeorm';
import { Done } from '../../utils/types';
import { AuthenticationProvider } from '../services/auth/auth';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authService: AuthenticationProvider,
  ) {
    super();
  }

  serializeUser(user: DiscordUser | TwitchUser, done: Done) {
    done(null, user);
  }

  async deserializeUser(user: DiscordUser | TwitchUser, done: Done) {

    if ("discordId" in user) {
      const userDB = await this.authService.findDiscordUser(user.discordId);
      return userDB ? done(null, userDB) : done(null, null);
    }
    else if ("twitchId" in user) {
      const userDB = await this.authService.findTwitchUser(user.twitchId);
      return userDB ? done(null, userDB) : done(null, null);
    }

  }
}