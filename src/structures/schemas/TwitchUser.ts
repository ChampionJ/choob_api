import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { AuthType, ChoobRole, ITwitchUser } from '../interfaces/IUser';
import { User } from './User';

export type TwitchUserDocument = TwitchUser & Document;

@Schema() //{ collection: 'twitch_users' }
export class TwitchUser implements ITwitchUser {
  _id!: Types.ObjectId;
  authType: AuthType;
  public accessToken?: string;
  public refreshToken?: string;
  public roles: ChoobRole[];

  @Prop({ required: true, unique: true })
  public identifier: string;
  @Prop({ required: true })
  public username: string;
  @Prop({ required: true })
  public displayName: string;
}
export const TwitchUserSchema = SchemaFactory.createForClass(TwitchUser)