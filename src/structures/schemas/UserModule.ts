
import { Module, Provider } from '@nestjs/common';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthType } from '../interfaces/IUser';
import { DiscordUser, DiscordUserDocument, DiscordUserSchema } from './DiscordUser';
import { TwitchUser, TwitchUserDocument, TwitchUserSchema } from './TwitchUser';
import { User, UserDocument, UserSchema } from './User';


const TwitchUserModelProvider: Provider<Model<TwitchUserDocument>> = {
  provide: getModelToken(TwitchUser.name),
  inject: [getModelToken(User.name)],
  useFactory: (UserModel: Model<UserDocument>) => UserModel.discriminator<TwitchUserDocument>(AuthType.TwitchUser, TwitchUserSchema),
};

const DiscordUserProvider: Provider<Model<DiscordUserDocument>> = {
  provide: getModelToken(DiscordUser.name),
  inject: [getModelToken(User.name)],
  useFactory: (UserModel: Model<DiscordUserDocument>) => UserModel.discriminator<DiscordUserDocument>(AuthType.DiscordUser, DiscordUserSchema),
};

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
        // discriminators: [
        //   { name: TwitchUser.name, schema: TwitchUserSchema },
        //   { name: DiscordUser.name, schema: DiscordUserSchema },
        // ],
      },
    ]),
  ],
  providers: [
    DiscordUserProvider,
    TwitchUserModelProvider
  ],
  exports: [
    MongooseModule,
    DiscordUserProvider,
    TwitchUserModelProvider
  ]
})
export class UserModule { }