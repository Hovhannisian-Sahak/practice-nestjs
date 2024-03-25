import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { UserSettings } from 'src/schemas/UserSettings.schema';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { encodePassword } from 'src/utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserSettings.name)
    private userSettingsModel: Model<UserSettings>,
  ) {}
  async createUser({ settings, ...createUserDto }: CreateUserDto) {
    const existingUser = await this.findByUsername(createUserDto.username);
    console.log(existingUser);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }
    if (settings) {
      const newSettings = new this.userSettingsModel(settings);
      const savedSettings = await newSettings.save();
      const newUser = new this.userModel({
        ...createUserDto,
        settings: savedSettings._id,
      });
      return newUser.save();
    }
    const password = encodePassword(createUserDto.password);
    const newUser = new this.userModel({ ...createUserDto, password });
    return newUser.save();
  }
  getUsers() {
    return this.userModel.find().populate(['settings', 'posts']);
  }
  getUserById(id: string) {
    return this.userModel.findById(id).populate('settings');
  }
  updateUser(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }
  deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
  async findByUsername(username: string) {
    const user = await this.userModel.findOne({ username });
    console.log(user);
    return user;
  }
}
