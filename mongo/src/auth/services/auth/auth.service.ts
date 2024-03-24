import { UsersService } from 'src/users/services/users/users.service';
import { Inject, Injectable } from '@nestjs/common';
import { comparePassword } from 'src/utils/bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string) {
    console.log('entering auth service');
    const existingUser = await this.userService.findByUsername(username);
    console.log(existingUser);
    if (!existingUser) {
      return null;
    }
    if (comparePassword(password, existingUser.password)) {
      console.log('barev');
      const payload = {
        sub: existingUser._id,
        username: existingUser.username,
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    return null;
  }
}
