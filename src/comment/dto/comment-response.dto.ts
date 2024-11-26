import { ApiProperty } from '@nestjs/swagger';

export class CommentResponseDto {
  @ApiProperty({ description: '댓글 ID', example: 1 })
  id!: number;

  @ApiProperty({ description: '댓글 내용', example: '이 게시글 정말 좋네요!' })
  content!: string;

  @ApiProperty({ description: '작성자 이름', example: '홍길동' })
  author!: string;

  @ApiProperty({ description: '작성일시', example: '2024-11-26 14:30' })
  createdAt!: string;
}
