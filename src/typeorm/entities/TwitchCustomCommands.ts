import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

export type TwitchCustomCommandInfoDocument = TwitchCustomCommandInfo & Document;
@Schema()
export class TwitchCustomCommandInfo {

  public _id?: Types.ObjectId;
  @Prop({ required: true })
  name!: string
  @Prop({ required: true })
  channel!: string
}


export type TwitchCustomCommandDocument = TwitchCustomCommand & Document;
@Schema()
export class TwitchCustomCommand {

  public _id!: Types.ObjectId;
  @Prop({ required: true, unique: true })
  public info!: TwitchCustomCommandInfo;
  @Prop({})
  public alias?: Types.ObjectId;
  @Prop({})
  public response?: string;
  @Prop({ default: false })
  public replyInDM?: false;
}
export const TwitchCustomCommandModel = SchemaFactory.createForClass(TwitchCustomCommand)
