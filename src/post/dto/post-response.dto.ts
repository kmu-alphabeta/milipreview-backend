import { ApiProperty } from '@nestjs/swagger';

export class PostResponseDto {
  @ApiProperty({ description: '게시글 ID', example: 1 })
  id!: number;

  @ApiProperty({ description: '게시글 제목', example: '게시글 제목 예제' })
  title!: string;

  @ApiProperty({ description: '게시글 내용', example: '게시글 내용 예제' })
  content!: string;

  @ApiProperty({ description: '작성자 이름', example: '홍길동' })
  author!: string;

  @ApiProperty({ description: '작성일시', example: '2024-11-26 14:30' })
  createdAt!: string;
}
