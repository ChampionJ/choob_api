import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { IUser, ChoobRole, AuthType } from '../interfaces/IUser';
import { DiscordUser } from './DiscordUser';
import { TwitchUser } from './TwitchUser';

export type UserDocument = User & Document;
@Schema({ discriminatorKey: 'authType', collection: 'choob_users' })
export class User implements IUser {
  _id!: Types.ObjectId;
  @Prop({
    type: String,
    required: true
  })
  authType: AuthType;
  @Prop({})
  identifier: string;
  @Prop({ type: [String] })
  public roles: ChoobRole[];
  @Prop({})
  public accessToken?: string;
  @Prop({})
  public refreshToken?: string;
}
export const UserSchema = SchemaFactory.createForClass(User);