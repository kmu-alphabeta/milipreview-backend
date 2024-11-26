import { Injectable } from '@nestjs/common';
import { Post } from '../entities/post.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { PostCreateDto } from './dto/post-create.dto';
import { PostResponseDto } from './dto/post-response.dto';
import { User } from '../entities/user.entity';
import * as moment from 'moment-timezone';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: EntityRepository<Post>,
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {
  }

  // 게시글 생성
  async createPost(userId: bigint, dto: PostCreateDto): Promise<void> {
    const user = await this.userRepository.findOneOrFail({ id: userId });
    await this.postRepository.insert({
      ...dto,
      author: user,
      createdAt: new Date(),
    });
  }

  // 모든 게시글 조회
  async getPosts(): Promise<PostResponseDto[]> {
    const posts = await this.postRepository.findAll(
      { populate: ['author'] },
    );
    return posts.map((post) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      author: post.author.name,
      createdAt: moment(post.createdAt).tz('Asia/Seoul').format('YYYY-MM-DD HH:mm'),
    }));
  }

  // ID로 게시글 조회
  async getPostById(postId: number): Promise<PostResponseDto> {
    const post = await this.postRepository.findOneOrFail(
      {
        id: postId,
      },
      { populate: ['author'] },
    );
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      author: post.author.name,
      createdAt: moment(post.createdAt).tz('Asia/Seoul').format('YYYY-MM-DD HH:mm'),
    };
  }

  // 게시글 삭제
  async deletePost(postId: number): Promise<void> {
    const post = await this.postRepository.findOneOrFail({ id: postId });
    await this.postRepository.nativeDelete(post);
  }
}
