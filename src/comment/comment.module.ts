import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Comment } from '../entities/comment.entity';
import { User } from '../entities/user.entity';
import { Post } from '../entities/post.entity';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';

@Module({
  imports: [MikroOrmModule.forFeature([Comment, User, Post])],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
