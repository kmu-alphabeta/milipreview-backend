import { Injectable } from '@nestjs/common';
import { Comment } from '../entities/comment.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { CommentCreateDto } from './dto/comment-create.dto';
import { CommentResponseDto } from './dto/comment-response.dto';
import { User } from '../entities/user.entity';
import { Post } from '../entities/post.entity';
import * as moment from 'moment-timezone';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: EntityRepository<Comment>,
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    @InjectRepository(Post)
    private readonly postRepository: EntityRepository<Post>,
  ) {}

  // 댓글 생성
  async createComment(
    userId: bigint,
    dto: CommentCreateDto,
  ): Promise<void> {
    const user = await this.userRepository.findOneOrFail({ id: userId });
    const post = await this.postRepository.findOneOrFail({ id: dto.postId });
    await this.commentRepository.insert({
      content: dto.content,
      author: user,
      post,
      createdAt: new Date(),
    });
  }

  // 게시글에 대한 모든 댓글 조회
  async getCommentsByPostId(postId: number): Promise<CommentResponseDto[]> {
    const comments = await this.commentRepository.find(
      { post: { id: postId } },
      { populate: ['author'] },
    );
    return comments.map((comment) => ({
      id: comment.id,
      content: comment.content,
      author: comment.author.name,
      createdAt: moment(comment.createdAt)
        .tz('Asia/Seoul')
        .format('YYYY-MM-DD HH:mm'),
    }));
  }

  // 댓글 삭제
  async deleteComment(commentId: number): Promise<void> {
    const comment = await this.commentRepository.findOneOrFail({ id: commentId });
    await this.commentRepository.nativeDelete(comment);
  }
}
