import { IsEnum, IsNotEmpty, IsString, ValidateIf } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export enum LoginProvider {
  KAKAO = 'kakao',
}

export class LoginQueryDto {
  @IsEnum(LoginProvider)
  @ApiProperty()
  type: LoginProvider;

  @ValidateIf((o) => !o.error && !o.error_description)
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  code?: string;

  @ValidateIf((o) => !o.code)
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  error?: string;

  @ValidateIf((o) => !o.code)
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  error_description?: string;
}

export class LoginResponseDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  token: string;
}
