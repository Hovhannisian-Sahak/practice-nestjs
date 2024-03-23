import { UsersService } from 'src/users/services/users/users.service';
import { CreateUserDto } from './../../dtos/CreateUser.dto';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ValidateCreateUserPipe } from 'src/users/pipes/validate-create-user/validate-create-user.pipe';
import { AuthGuard } from 'src/users/guards/auth/auth.guard';
import mongoose from 'mongoose';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { UsersInterceptor } from 'src/users/interceptors/users/users.interceptor';
import { ErrorsInterceptor } from 'src/users/interceptors/errors/errors.interceptor';

@Controller('users')
// @UseGuards(AuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}
  // @Get()
  // getUsers() {
  //   return this.usersService.createUser();
  // }
  @Post()
  createUsers(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @UseInterceptors(UsersInterceptor)
  @UseInterceptors(ErrorsInterceptor)
  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('User not found', 404);
    const user = await this.usersService.getUserById(id);
    if (!user) {
      throw new HttpException('Usernot found', 404);
    }
    return user;
  }
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('User not found', 404);
    const updatedUser = await this.usersService.updateUser(id, updateUserDto);
    if (!updatedUser) throw new HttpException('User Not Found', 404);
    return updatedUser;
  }
  @Delete(':id')
  async removeUser(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('User not found', 404);
    const deleteUser = await this.usersService.deleteUser(id);
    if (!deleteUser) throw new HttpException('User Not Found', 404);
    return;
  }
  // @Get(':id/:postId')
  // getUserById(@Param('id') id: string) {
  //   return `user by ${id}`;
  // }
  // @Get('query')
  // getUsersbyQuery(@Query('age', ParseIntPipe) age: number) {
  //   return age;
  // }
}
