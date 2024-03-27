import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRepository } from 'src/users/repository/users.repository';
import { UserSettings } from 'src/schemas/UserSettings.schema';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { encodePassword } from 'src/utils/bcrypt';
import { User } from 'src/schemas/User.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @Inject(UserRepository) private readonly usersRepository: UserRepository,
    @InjectModel(UserSettings.name)
    private userSettingsModel: Model<UserSettings>,
  ) {}
  async createUser({ settings, ...createUserDto }: CreateUserDto) {
    const existingUser = await this.usersRepository.findByUsername(
      createUserDto.username,
    );
    console.log(existingUser);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }
    if (settings) {
      const newSettings = new this.userSettingsModel(settings);
      const savedSettings = await newSettings.save();
      const newUser = await this.usersRepository.create({
        ...createUserDto,
        settings: savedSettings.id,
      });

      return newUser.save();
    }
    const password = encodePassword(createUserDto.password);
    const newUser = await this.userModel.create({
      ...createUserDto,
      password,
    });
    return newUser.save();
  }

  async getUserById(id: string) {
    const user = await this.userModel.findById(id);

    await user.populate(['settings', 'posts']);
    return user;
  }
  async getUsers() {
    return await this.userModel.find().populate('settings posts');
  }

  updateUser(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findOneAndUpdate({ _id: id }, updateUserDto);
  }
  deleteUser(id: string) {
    return this.userModel.findOneAndDelete({ _id: id });
  }
  findByUsername(username: string) {
    return this.userModel.findOne({ username });
  }
}
