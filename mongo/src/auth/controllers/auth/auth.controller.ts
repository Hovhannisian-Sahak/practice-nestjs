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
}
