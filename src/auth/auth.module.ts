import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { DiscordStrategy } from './utils/DiscordStrategy';
import { TwitchStrategy } from './utils/TwitchStrategy';
import { SessionSerializer } from './utils/Serializer';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/structures/schemas/UserModule';
import { DiscordUser, DiscordUserSchema } from 'src/structures/schemas/DiscordUser';
import { TwitchUser, TwitchUserSchema } from 'src/structures/schemas/TwitchUser';

@Module({
  controllers: [AuthController],
  providers: [
    DiscordStrategy,
    TwitchStrategy,
    SessionSerializer,
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
  ],
  imports: [
    UserModule,
    // MongooseModule.forFeature([{ name: DiscordUser.name, schema: DiscordUserSchema }]),
    // MongooseModule.forFeature([{ name: TwitchUser.name, schema: TwitchUserSchema }])

    // TypeOrmModule.forFeature([DiscordUser]),
    // TypeOrmModule.forFeature([TwitchUser])
  ],
  exports: [
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
  ],
})
export class AuthModule { }