import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreatePostDto } from './dto/CreatePost.dto';
import { Post } from '../schemas/Post.schema';
import { User } from '../schemas/User.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name)
    private postModel: Model<Post>,
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}
  async createPost(user: User, createPostDto: CreatePostDto) {
    const existingUser = await this.userModel.findOne({
      username: user.username,
    }); // Await the result
    console.log(existingUser);
    if (!existingUser) {
      throw new HttpException('User not found', 404);
    }
    const newPost = new this.postModel(createPostDto);
    const savedPost = await newPost.save();
    await existingUser.updateOne({ $push: { posts: savedPost._id } });
    console.log(existingUser);
    console.log(savedPost);
    return savedPost;
  }
  findPostById() {}
}
