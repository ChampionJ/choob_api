import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { ChoobRole } from 'src/utils/types';



// @Entity({ name: 'twitch_users' })
// export class TwitchUser {
//   @ObjectIdColumn()
//   id: ObjectID;

//   @Column({ unique: true })
//   twitchId: string;

//   @Column()
//   username: string;

//   @Column()
//   displayName: string;

//   @Column()
//   accessToken: string;

//   @Column()
//   refreshToken: string;
// }

export type TwitchUserDocument = TwitchUser & Document;

@Schema() //{ collection: 'twitch_users' }
export class TwitchUser {
  _id!: Types.ObjectId;
  authType: string;
  public accessToken?: string;
  public refreshToken?: string;
  public roles?: ChoobRole[];

  @Prop({ required: true, unique: true })
  public identifier: string;

  @Prop({ required: true })
  public username: string;

  @Prop({ required: true })
  public displayName: string;

  // @Prop({})
  // public accessToken: string;

  // @Prop({})
  // public refreshToken: string;
}
export const TwitchUserSchema = SchemaFactory.createForClass(TwitchUser)