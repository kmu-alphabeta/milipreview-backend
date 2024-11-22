import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum LoginProvider {
  KAKAO = 'kakao',
}

export class LoginBodyDto {
  @IsEnum(LoginProvider)
  @ApiProperty({ example: 'kakao' })
  type: LoginProvider;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({description: 'Kakao OAuth code 값'})
  code?: string;
}

export class LoginResponseDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Authorization 토큰 값' })
  token: string;
}
