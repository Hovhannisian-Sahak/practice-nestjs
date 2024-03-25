import { Inject } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/schemas/User.schema';
import { UsersService } from 'src/users/services/users/users.service';

export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
  ) {
    super();
  }
  serializeUser(user: User, done: (err, user: User) => void) {
    console.log('serialize');
    done(null, user);
  }
  async deserializeUser(user: User, done: (err, user: User) => void) {
    console.log('deserialize');
    const userDB = await this.userService.findByUsername(user.username);
    return userDB ? done(null, user) : done(null, null);
  }
}
