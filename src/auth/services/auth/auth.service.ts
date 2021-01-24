import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DiscordUserDocument } from 'src/typeorm/entities/DiscordUser';
import { TwitchUserDocument } from 'src/typeorm/entities/TwitchUser';
import { DiscordUser, TwitchUser } from '../../../typeorm';
import { DiscordUserDetails, TwitchUserDetails } from '../../../utils/types';
import { AuthenticationProvider } from './auth';

@Injectable()
export class AuthService implements AuthenticationProvider {
  constructor(
    @InjectModel(DiscordUser.name) private discordUserRepo: Model<DiscordUserDocument>,
    @InjectModel(TwitchUser.name) private twitchUserRepo: Model<TwitchUserDocument>
    //@InjectRepository(DiscordUser) private discordUserRepo: Repository<DiscordUser>,
    //@InjectRepository(TwitchUser) private twitchUserRepo: Repository<TwitchUser>
  ) { }

  async validateDiscordUser(details: DiscordUserDetails) {
    const { discordId } = details;
    const user = await this.discordUserRepo.findOne({ discordId });
    if (user) {
      await this.discordUserRepo.updateOne({ discordId }, details);
      console.log('Updated');
      return user;
    }
    return this.createDiscordUser(details);
  }

  createDiscordUser(details: DiscordUserDetails) {
    const user = new this.discordUserRepo(details);
    return user.save();
  }

  findDiscordUser(discordId: string): Promise<DiscordUser | undefined> {
    return this.discordUserRepo.findOne({ discordId: discordId }).exec();
  }



  async validateTwitchUser(details: TwitchUserDetails) {
    const { twitchId } = details;
    const user = await this.twitchUserRepo.findOne({ twitchId });
    if (user) {
      await this.twitchUserRepo.updateOne({ twitchId }, details);
      console.log('Updated');
      return user;
    }
    return this.createTwitchUser(details);
  }

  createTwitchUser(details: TwitchUserDetails) {
    const user = new this.twitchUserRepo(details);
    return user.save();
  }

  findTwitchUser(twitchId: string): Promise<TwitchUser | undefined> {
    return this.twitchUserRepo.findOne({ twitchId: twitchId }).exec();
  }
}