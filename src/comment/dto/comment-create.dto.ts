import { ApiProperty } from '@nestjs/swagger';

export class CommentCreateDto {
  @ApiProperty({ description: '댓글 내용', example: '이 게시글 정말 좋네요!' })
  content!: string;

  @ApiProperty({ description: '대상 게시글 ID', example: 1 })
  postId!: number;
}
