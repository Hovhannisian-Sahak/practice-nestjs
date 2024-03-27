import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { User } from '../../schemas/User.schema';
import { CreateUserDto } from '../dtos/CreateUser.dto';


export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async findByUsername(username: string) {
    return await this.userModel.findOne({ username });
  }
  find() {
    return this.userModel.find();
  }
  async create(createUserDto: CreateUserDto) {
    return await this.userModel.create(createUserDto);
  }
  async findOneAndUpdate(query: any, update: any) {
    const product = await this.userModel.findOneAndUpdate(query, update, {
      new: true,
    });
    return product;
  }
  async findOneAndDelete(query: any) {
    const product = await this.userModel.findOneAndDelete(query);
    return product;
  }
  async findById(id: string) {
    return await this.userModel.findById({ _id: id });
  }
}
