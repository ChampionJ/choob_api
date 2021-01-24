import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

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

@Schema({ collection: 'discord_users' })
export class DiscordUser {
  // @Prop({ auto: true, required: true, unique: true })
  _id!: Types.ObjectId;

  @Prop({ required: true, unique: true })
  public discordId!: string;

  @Prop({ required: true })
  public username!: string;

  @Prop({ required: true })
  public discriminator!: string;
  @Prop({})
  public avatar?: string;

  @Prop({})
  public accessToken?: string;

  @Prop({})
  public refreshToken?: string;
}
export const DiscordUserSchema = SchemaFactory.createForClass(DiscordUser);