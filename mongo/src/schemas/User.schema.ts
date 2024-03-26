import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { UserSettings } from './UserSettings.schema';
import { Post } from './Post.schema';
import { Exclude } from 'class-transformer';
import { Role } from 'src/auth/enums/roles.enum';

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: false })
  displayName?: string;
  @Prop({ required: false })
  avatarUrl?: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserSettings' })
  settings?: UserSettings;
  @Prop({ type: [String], default: [Role.User] })
  roles: Role[];
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] })
  posts: Post[];
}
export const UserSchema = SchemaFactory.createForClass(User);
