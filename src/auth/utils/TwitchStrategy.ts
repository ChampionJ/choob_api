import { Profile, Strategy } from 'passport-twitch-new';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { AuthenticationProvider } from '../services/auth/auth';

@Injectable()
export class TwitchStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authService: AuthenticationProvider,
  ) {
    super({
      clientID: process.env.TWITCH_CLIENT_ID,
      clientSecret: process.env.TWITCH_CLIENT_SECRET,
      callbackURL: process.env.TWITCH_CALLBACK_URL,
      scope: ['user_read'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { login: username, display_name: displayName, id: twitchId } = profile;
    const details = {
      displayName,
      twitchId,
      username,
      accessToken,
      refreshToken,
    };
    return this.authService.validateTwitchUser(details);
  }
}