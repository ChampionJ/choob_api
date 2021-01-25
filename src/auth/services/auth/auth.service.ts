import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { DiscordUser, DiscordUserDocument } from 'src/typeorm/entities/DiscordUser';
import { TwitchUser, TwitchUserDocument } from 'src/typeorm/entities/TwitchUser';
import { User, UserDocument } from 'src/typeorm/entities/User';
// import { DiscordUser, TwitchUser } from '../../../typeorm';
import { DiscordUserDetails, TwitchUserDetails } from '../../../utils/types';
import { AuthenticationProvider } from './auth';

@Injectable()
export class AuthService implements AuthenticationProvider {
  constructor(
    @InjectModel(DiscordUser.name) private discordUserRepo: Model<DiscordUserDocument>,
    @InjectModel(TwitchUser.name) private twitchUserRepo: Model<TwitchUserDocument>,
    @InjectModel(User.name) private userRepo: Model<TwitchUserDocument | DiscordUserDocument>

    //@InjectModel(TwitchUser.name) private twitchUserRepo: Model<TwitchUserDocument>

    //@InjectRepository(DiscordUser) private discordUserRepo: Repository<DiscordUser>,
    //@InjectRepository(TwitchUser) private twitchUserRepo: Repository<TwitchUser>
  ) { }

  async validateDiscordUser(details: DiscordUserDetails) {
    const { identifier } = details;
    const user = await this.discordUserRepo.findOne({ identifier: identifier });
    if (user) {
      await this.discordUserRepo.updateOne({ identifier: identifier }, details);
      console.log('Updated');
      return user;
    }
    return this.createDiscordUser(details);
  }

  createDiscordUser(details: DiscordUserDetails) {
    const user = new this.discordUserRepo(details);
    return user.save();
  }

  findDiscordUser(identifier: string): Promise<DiscordUser | undefined> {
    return this.discordUserRepo.findOne({ identifier: identifier }).exec();
  }

  async validateTwitchUser(details: TwitchUserDetails) {
    const { identifier } = details;
    const user = await this.twitchUserRepo.findOne({ identifier: identifier });
    if (user) {
      await this.twitchUserRepo.updateOne({ identifier: identifier }, details);
      console.log('Updated');
      return user;
    }
    return this.createTwitchUser(details);
  }

  createTwitchUser(details: TwitchUserDetails) {
    const user = new this.twitchUserRepo(details);
    return user.save();
  }

  findTwitchUser(identifier: string): Promise<TwitchUser | undefined> {
    return this.twitchUserRepo.findOne({ identifier: identifier }).exec();
  }

  findUser(authType: string, id: string): Promise<TwitchUser | DiscordUser | undefined> {
    return this.userRepo.findOne({ authType: authType, identifier: id }).exec();
  }
}