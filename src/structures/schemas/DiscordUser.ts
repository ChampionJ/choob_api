import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { AuthType, ChoobRole, IDiscordUser } from '../interfaces/IUser';
import { User } from './User';

export type DiscordUserDocument = DiscordUser & Document;

//@Schema({ collection: 'discord_users' })
@Schema()
export class DiscordUser implements IDiscordUser {
  _id!: Types.ObjectId;
  authType!: AuthType;
  public accessToken?: string;
  public refreshToken?: string;
  public roles: ChoobRole[];
  @Prop({ required: true, unique: true })
  public identifier!: string;
  @Prop({ required: true })
  public username!: string;
  @Prop({ required: true })
  public discriminator!: string;
  @Prop({})
  public avatar?: string;
}
export const DiscordUserSchema = SchemaFactory.createForClass(DiscordUser);

