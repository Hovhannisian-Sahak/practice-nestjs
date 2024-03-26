import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'reflect-metadata';
// import * as session from 'express-session';
// import * as passport from 'passport';

require('dotenv').config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const MongoStore = require('connect-mongo');
  app.useGlobalPipes(new ValidationPipe());
  // app.use(
  //   session({
  //     name: 'NESTJS_SESSION',
  //     secret: process.env.SESSION_KEY,
  //     resave: false,
  //     saveUninitialized: false,
  //     cookie: {
  //       maxAge: 60000,
  //     },
  //     store: MongoStore.create({
  //       mongoUrl: process.env.DB__URL,
  //       dbName: 's',
  //     }),
  //   }),
  // );
  // app.use(passport.initialize());
  // app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
