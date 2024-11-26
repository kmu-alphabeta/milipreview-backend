import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentCreateDto } from './dto/comment-create.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard, AuthRequest } from '../auth/auth.guard';
import { CommentResponseDto } from './dto/comment-response.dto';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({ description: '댓글 생성' })
  @ApiResponse({
    status: 201,
    description: '생성된 댓글 ID 반환',
    type: Number,
  })
  @Post()
  async createComment(
    @Request() { user }: AuthRequest,
    @Body() dto: CommentCreateDto,
  ): Promise<void> {
    await this.commentService.createComment(user.id, dto);
  }

  @ApiOperation({ description: '게시글의 모든 댓글 조회' })
  @ApiResponse({
    status: 200,
    description: '댓글 목록 반환',
    type: [CommentResponseDto],
  })
  @Get('post/:postId')
  async getCommentsByPostId(
    @Param('postId') postId: number,
  ): Promise<CommentResponseDto[]> {
    return this.commentService.getCommentsByPostId(postId);
  }

  @ApiOperation({ description: '댓글 삭제' })
  @ApiResponse({
    status: 204,
    description: '삭제 완료',
  })
  @Delete(':id')
  async deleteComment(@Param('id') commentId: number): Promise<void> {
    await this.commentService.deleteComment(commentId);
  }
}
