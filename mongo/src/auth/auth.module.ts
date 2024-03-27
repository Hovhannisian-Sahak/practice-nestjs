import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';

import { MongooseModule } from '@nestjs/mongoose';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/JwtStrategy';
import { User, UserSchema } from '../schemas/User.schema';
import {
  UserSettings,
  UserSettingsSchema,
} from '../schemas/UserSettings.schema';
import { UsersService } from '../users/services/users/users.service';
import { LocalStrategy } from './strategies/LocalStrategy';
import { UserRepository } from '../users/repository/users.repository';

// import { SessionSerializer } from 'src/utils/SessionSerializer';
require('dotenv').config();
@Module({
  imports: [
    MongooseModule.forFeature([
      ,
      { name: User.name, schema: UserSchema },
      { name: UserSettings.name, schema: UserSettingsSchema },
    ]),

    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],

  controllers: [AuthController],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    {
      provide: 'USER_SERVICE',
      useClass: UsersService,
    },
    AuthService,
    LocalStrategy,
    JwtStrategy,
    UserRepository,

    // SessionSerializer,
  ],
})
export class AuthModule {}
