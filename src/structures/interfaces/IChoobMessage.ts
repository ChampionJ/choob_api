import { Types, Document } from 'mongoose';

export interface IChoobQuote {
  //* Required and Unique Properties
  _id: Types.ObjectId;
  quote: string;

  //* Required Properties
  createdAt: Date;
  updatedAt: Date;
  author: string;
  authorId: string;
}