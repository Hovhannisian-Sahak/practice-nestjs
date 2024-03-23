import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserLoginDto } from 'src/auth/dto/UserLogin.dto';
import { AuthService } from 'src/auth/services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(userLoginDto: UserLoginDto) {
    return this.authService.validateUser(
      userLoginDto.username,
      userLoginDto.password,
    );
  }
}
