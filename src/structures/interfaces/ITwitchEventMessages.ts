import { Types, Document } from 'mongoose';

export enum TwitchEventMessageTypes {
  GIFTEDSUB = 'Gifted Subscription',
  SUB = 'New Subscription',
  RESUB = 'Resubscribed'
};

export interface ITwitchEventMessage {
  //* Required and Unique Properties
  _id: Types.ObjectId;
  //* Required Properties
  eventType: string
  message: string;
}

export interface ITwitchEventMessageGiftedSubs extends ITwitchEventMessage {
  //* Required Properties
  minimumGifts: number;
}