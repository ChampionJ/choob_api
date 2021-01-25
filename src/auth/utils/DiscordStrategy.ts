import { Profile, Strategy } from 'passport-discord';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { AuthenticationProvider } from '../services/auth/auth';
import { DiscordUserDetails } from 'src/utils/types';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authService: AuthenticationProvider,
  ) {
    super({
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: process.env.DISCORD_CALLBACK_URL,
      scope: ['identify', 'guilds'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { username, discriminator, id: identifier, avatar } = profile;
    const details: DiscordUserDetails = {
      username,
      discriminator,
      identifier,
      avatar,
      accessToken,
      refreshToken
    };
    return this.authService.validateDiscordUser(details);
  }
}