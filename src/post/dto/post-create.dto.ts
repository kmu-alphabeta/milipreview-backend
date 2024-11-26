import { ApiProperty } from '@nestjs/swagger';

export class PostCreateDto {
  @ApiProperty({ description: '게시글 제목', example: '게시글 제목 예제' })
  title!: string;

  @ApiProperty({ description: '게시글 내용', example: '게시글 내용 예제' })
  content!: string;
}
