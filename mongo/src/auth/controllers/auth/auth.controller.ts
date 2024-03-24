import {
  Body,
  Controller,
  HttpException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserLoginDto } from 'src/auth/dto/UserLogin.dto';
import { LocalGuard } from 'src/auth/guards/local.guard';
import { AuthService } from 'src/auth/services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @UseGuards(LocalGuard)
  async login(@Req() req, @Body() userLoginDto: UserLoginDto) {
    console.log(req);
    const user = await this.authService.validateUser(
      userLoginDto.username,
      userLoginDto.password,
    );
    return user;
  }
}
