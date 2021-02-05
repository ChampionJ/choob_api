import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { ChannelPermissionLevel, ITwitchCustomCommand } from '../interfaces/ICommand';

export type TwitchCustomCommandDocument = TwitchCustomCommand & Document;
@Schema({ collection: 'custom_commands_twitch' })
export class TwitchCustomCommand implements ITwitchCustomCommand {
  public _id: Types.ObjectId;
  @Prop({ required: true })
  name: string
  @Prop({ required: true })
  channelId: string
  @Prop({ required: true })
  channelPermissionLevelRequired: ChannelPermissionLevel;
  @Prop({ required: true })
  channelName: string
  @Prop({})
  alias?: Types.ObjectId;
  @Prop({})
  response?: string;
  @Prop({ default: false })
  colorResponse: false;
}
export const TwitchCustomCommandModel = SchemaFactory.createForClass(TwitchCustomCommand)
