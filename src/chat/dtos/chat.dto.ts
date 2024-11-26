// import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChatBodyDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  chat: string;
}

export class ChatResponseDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  response: string;
}
