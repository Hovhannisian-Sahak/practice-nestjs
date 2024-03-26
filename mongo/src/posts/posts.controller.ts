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
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}
  @Post()
  @UsePipes(new ValidationPipe())
  // @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  // @UseGuards(AuthenticatedGuard)
  createPost(@Req() req, @Body() createPostdto: CreatePostDto) {
    console.log(req);
    return this.postService.createPost(req.user, createPostdto);
  }
}
