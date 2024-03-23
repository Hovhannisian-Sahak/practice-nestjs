import { UsersService } from 'src/users/services/users/users.service';
import { Inject, Injectable } from '@nestjs/common';
import { comparePassword } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
  ) {}
  async validateUser(username: string, password: string) {
    const user = await this.userService.findByUsername(username);
    if (user && comparePassword(password, user.password)) {
      return user;
    }
    return null;
  }
}
