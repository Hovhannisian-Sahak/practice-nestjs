import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { Request } from 'express';
import { AuthService } from '../../services/auth/auth.service';
import { LocalGuard } from '../../guards/local.guard';
import { JwtAuthGuard } from '../../guards/jwt.guard';
import { AuthenticatedGuard } from '../../guards/authenticated.guard';

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
