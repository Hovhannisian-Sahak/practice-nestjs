import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://sahak:sahak@nest.xoqgyw3.mongodb.net/nest?retryWrites=true&w=majority',
    ),
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
