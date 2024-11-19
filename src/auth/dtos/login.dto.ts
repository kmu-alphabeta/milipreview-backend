import { IsEnum, IsNotEmpty, IsString, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum LoginProvider {
  KAKAO = 'kakao',
}

export class LoginBodyDto {
  @IsEnum(LoginProvider)
  @ApiProperty()
  type: LoginProvider;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  code?: string;
}

export class LoginResponseDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  token: string;
}
