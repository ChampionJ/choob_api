import { Types, Document } from 'mongoose';

export interface ITwitchToken {
  //* Required
  accessToken: string;
  refreshToken: string;
  expiryTimestamp: number;
}

export interface IAPIToken {
  //* Required and Unique
  _id: Types.ObjectId;
  identifier: string;
  //* Required
  accessToken: string;
  refreshToken: string;
  expiryTimestamp: number;
}