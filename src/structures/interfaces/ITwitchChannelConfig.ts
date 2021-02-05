import { Types, Document } from 'mongoose';

export interface ITwitchChannelConfig {
  //* Unique and Required Properties
  _id?: Types.ObjectId;
  identifier: string;

  //* Required Properties
  channelName: string;
  botIsInChannel: boolean;
  prefix: string;
  colorAllMessages: boolean;

}