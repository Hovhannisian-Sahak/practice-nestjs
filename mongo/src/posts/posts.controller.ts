import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/CreatePost.dto';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/enums/roles.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}
  @Post()
  @UsePipes(new ValidationPipe())
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  createPost(@Body() createPostdto: CreatePostDto) {
    return this.postService.createPost(createPostdto);
  }
}
