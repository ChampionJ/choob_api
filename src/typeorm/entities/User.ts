import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { ChoobRole } from 'src/utils/types';
import { DiscordUser } from './DiscordUser';
import { TwitchUser } from './TwitchUser';

export type UserDocument = User & Document;
@Schema({ discriminatorKey: 'authType', collection: 'api_users' })
export class User {
  _id!: Types.ObjectId;

  @Prop({
    type: String,
    required: true,
    enum: [DiscordUser.name, TwitchUser.name],
  })
  authType: string;
  identifier: string;

  @Prop({ type: [String] })
  public roles?: ChoobRole[];

  @Prop({})
  public accessToken?: string;

  @Prop({})
  public refreshToken?: string;
}
export const UserSchema = SchemaFactory.createForClass(User);