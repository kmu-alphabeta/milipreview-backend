import { IsEnum, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export enum LoginProvider {
  KAKAO = 'kakao',
}

export class LoginQueryDto {
  @IsEnum(LoginProvider)
  type: LoginProvider;

  @ValidateIf((o) => !o.error && !o.error_description)
  @IsNotEmpty()
  @IsString()
  code?: string;

  @ValidateIf((o) => !o.code)
  @IsNotEmpty()
  @IsString()
  error?: string;

  @ValidateIf((o) => !o.code)
  @IsNotEmpty()
  @IsString()
  error_description?: string;
}

export class LoginResponseDto {
  @IsNotEmpty()
  @IsString()
  token: string;
}
