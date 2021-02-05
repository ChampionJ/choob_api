import { HttpModule, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { DiscordUserResolver, TwitchUserResolver, UserResolver } from './graphql/resolvers/User.resolver';
import { DiscordModule } from './discord/discord.module';
import { TwitchModule } from './twitch/twitch.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ChoobResolver } from './graphql/resolvers/Choob.resolver';
import { UserModule } from './structures/schemas/UserModule';
import { TwitchCustomCommand, TwitchCustomCommandModel } from './structures/schemas/TwitchCustomCommands';
import { TwitchUser, TwitchUserSchema } from './structures/schemas/TwitchUser';

let envFilePath = '.env.development';

console.log(`Running in ${process.env.ENVIRONMENT}`);
if (process.env.ENVIRONMENT === 'PRODUCTION') {
  envFilePath = '.env.production';
} else if (process.env.ENVIRONMENT === 'TEST') {
  envFilePath = '.env.testing';
}

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath }),
    AuthModule,
    PassportModule.register({ session: true }),
    // TypeOrmModule.forRoot({
    //   type: 'mongodb',
    //   //host: process.env.DB_HOST,
    //   // port: Number.parseInt(process.env.DB_PORT),
    //   // username: process.env.DB_USER,
    //   // password: process.env.DB_PASS,
    //   // database: process.env.DB_NAME,
    //   ssl: true,
    //   url: process.env.DB_HOST,
    //   useNewUrlParser: true,
    //   entities,
    //   synchronize: true,
    // }),
    MongooseModule.forRoot(process.env.DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }),

    HttpModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: { path: join(process.cwd(), 'src', 'graphql', 'index.ts') },
      useGlobalPrefix: true,
      cors: { origin: 'http://localhost:3000' },
    }),
    DiscordModule,
    TwitchModule,
    MongooseModule.forFeature([{ name: TwitchCustomCommand.name, schema: TwitchCustomCommandModel }]),
    UserModule,
  ],
  controllers: [],
  providers: [DiscordUserResolver, TwitchUserResolver, ChoobResolver, UserResolver],
})
export class AppModule { }
