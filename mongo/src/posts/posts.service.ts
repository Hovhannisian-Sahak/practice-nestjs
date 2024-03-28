import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreatePostDto } from './dto/CreatePost.dto';
import { Post } from '../schemas/Post.schema';
import { User } from '../schemas/User.schema';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { ResponseAddEvent } from './events/response-add-post.event';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name)
    private postModel: Model<Post>,
    @InjectModel(User.name)
    private userModel: Model<User>,
    private eventEmitter: EventEmitter2,
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
    const payload = new ResponseAddEvent();
    payload.userId = existingUser.id;
    payload.postId = savedPost.id;
    this.eventEmitter.emit('post.created', payload);
    console.log(existingUser);
    console.log(savedPost);
    return savedPost;
  }
  @OnEvent('post.created')
  handleCreatePostResponse(payload: ResponseAddEvent) {
    console.log('responseHandled', payload);
  }
  findPostById() {}
}
