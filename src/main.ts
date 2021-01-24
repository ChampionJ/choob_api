import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';

const MongoStore = require('connect-mongo')(session);
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3003;


  app.setGlobalPrefix('api');
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });


  const opts = { url: process.env.DB_HOST }

  app.use(
    session({
      cookie: {
        maxAge: 86400000,
      },
      secret: process.env.COOKIE_SECRET,
      resave: false,
      saveUninitialized: false,
      store: new MongoStore(opts),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(PORT, () => console.log(`Running on Port ${PORT}`));
}
bootstrap();
