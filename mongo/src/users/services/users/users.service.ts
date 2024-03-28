import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../../schemas/User.schema';
import { UserRepository } from '../../repository/users.repository';
import { UserSettings } from '../../../schemas/UserSettings.schema';
import { CreateUserDto } from '../../dtos/CreateUser.dto';
import { encodePassword } from '../../../utils/bcrypt';
import { UpdateUserDto } from '../../dtos/UpdateUser.dto';
import { APIFeatures } from '../../../utils/apiFeatures';

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
      throw new BadRequestException('User already exists');
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
  async getUsers(query?: any) {
    const features = new APIFeatures(
      this.userModel.find().populate('settings posts'),
      query,
    )
      .filter()
      .sorting()
      .limit()
      .pagination();
    const users = await features.mongooseQuery;
    return users;
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
