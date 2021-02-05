import { Types, Document } from 'mongoose';

export enum ChannelPermissionLevel {
  BROADCASTER = 'Broadcaster',
  MODERATOR = 'Moderator',
  VIP = 'Vip',
  GENERAL = 'General',
  CHOOB_CHANNEL = 'Choob'
}


export interface ITwitchCustomCommand {
  //* Required and Unique Properties
  _id: Types.ObjectId;
  //* Required Properties
  name: string
  channelId: string
  channelName: string
  colorResponse: boolean;
  channelPermissionLevelRequired: ChannelPermissionLevel;
  //* Optional Properties
  alias?: Types.ObjectId;
  response?: string;
}

export interface ITwitchChoobCommand {
  //* Required and Unique Properties
  _id: Types.ObjectId;
  name: string
  //* Required Properties
  aliases: string[];
  channelPermissionLevelRequired: ChannelPermissionLevel;
  response: string;
  colorResponse: false;
}


