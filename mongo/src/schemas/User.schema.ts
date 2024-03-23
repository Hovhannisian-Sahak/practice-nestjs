import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { UserSettings } from './UserSettings.schema';
import { Post } from './Post.schema';
import { Exclude } from 'class-transformer';

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  firstName: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: false })
  @Exclude()
  displayName?: string;
  @Prop({ required: false })
  avatarUrl?: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserSettings' })
  settings?: UserSettings;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] })
  posts: Post[];
}
export const UserSchema = SchemaFactory.createForClass(User);
