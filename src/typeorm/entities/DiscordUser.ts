import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { ChoobRole } from 'src/utils/types';

// @Entity({ name: 'discord_users' })
// export class DiscordUser {
//   @ObjectIdColumn()
//   id: ObjectID;

//   @Column({ unique: true })
//   discordId: string;

//   @Column()
//   username: string;

//   @Column()
//   discriminator: string;

//   @Column({ nullable: true })
//   avatar: string;

//   @Column()
//   accessToken: string;

//   @Column()
//   refreshToken: string;
// }


export type DiscordUserDocument = DiscordUser & Document;

//@Schema({ collection: 'discord_users' })
@Schema()
export class DiscordUser {
  _id!: Types.ObjectId;
  authType: string;
  public accessToken?: string;
  public refreshToken?: string;
  public roles?: ChoobRole[];
  // @Prop({ auto: true, required: true, unique: true })

  @Prop({ required: true, unique: true })
  public identifier!: string;

  @Prop({ required: true })
  public username!: string;

  @Prop({ required: true })
  public discriminator!: string;
  @Prop({})
  public avatar?: string;

  // @Prop({})
  // public accessToken?: string;

  // @Prop({})
  // public refreshToken?: string;
}
export const DiscordUserSchema = SchemaFactory.createForClass(DiscordUser);

