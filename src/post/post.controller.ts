import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard, AuthRequest } from '../auth/auth.guard';
import { PostCreateDto } from './dto/post-create.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostResponseDto } from './dto/post-response.dto';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('posts') // Swagger 태그 추가
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({ description: '게시글 생성' })
  @ApiResponse({
    status: 201,
    description: '생성된 게시글 ID 반환',
    type: Number,
  })
  @ApiBody({ type: PostCreateDto })
  @Post()
  async createPost(
    @Request() { user }: AuthRequest,
    @Body() dto: PostCreateDto,
  ): Promise<void> {
    await this.postService.createPost(user.id, dto);
  }

  @ApiOperation({ description: '모든 게시글 조회' })
  @ApiResponse({
    status: 200,
    description: '게시글 목록 반환',
    type: [PostResponseDto],
  })
  @Get()
  async getPosts(): Promise<PostResponseDto[]> {
    return this.postService.getPosts();
  }

  @ApiOperation({ description: '게시글 상세 조회' })
  @ApiResponse({
    status: 200,
    description: '게시글 상세 정보 반환',
    type: PostResponseDto,
  })
  @Get(':id')
  async getPostById(@Param('id') id: number): Promise<PostResponseDto> {
    return this.postService.getPostById(id);
  }

  @ApiOperation({ description: '게시글 삭제' })
  @ApiResponse({
    status: 204,
    description: '삭제 완료',
  })
  @Delete(':id')
  async deletePost(@Param('id') id: number): Promise<void> {
    await this.postService.deletePost(id);
  }
}
