import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/CreatePost.dto';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/enums/roles.enum';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ResponseAddEvent } from './events/response-add-post.event';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}
  @Post()
  @UsePipes(new ValidationPipe())
  // @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  // @UseGuards(AuthenticatedGuard)
  async createPost(@Req() req, @Body() createPostdto: CreatePostDto) {
    return await this.postService.createPost(req.user, createPostdto);
  }
}
