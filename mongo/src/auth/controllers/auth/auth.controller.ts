import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserLoginDto } from 'src/auth/dto/UserLogin.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { LocalGuard } from 'src/auth/guards/local.guard';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { Request } from 'express';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  async login(@Req() req: Request) {
    return req.user;
  }
  @Get('status')
  @UseGuards(JwtAuthGuard)
  status(@Req() req: Request) {
    return req.user;
  }
  @UseGuards(AuthenticatedGuard)
  @Get('/protected')
  getHello(@Req() req): string {
    return req.user;
  }
  @Get('/logout')
  logout(@Req() req): any {
    req.session.destroy();
    return { msg: 'The user session has ended' };
  }
}
