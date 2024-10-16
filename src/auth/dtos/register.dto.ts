import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';

export class RegisterBodyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  narasarang: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^20\d{2}\-(0[1-9]|1[0-2])\-(0[1-9]|[1-2][0-9]|3[0-1])$/) // 20XX-XX-XX
  birth: string;

  @IsNotEmpty()
  @Matches(/^010-\d{4}-\d{4}$/)
  phone: string;

  @IsNotEmpty()
  @IsString()
  militaryServiceOffice: string;

  @IsNotEmpty()
  @IsString()
  applicantRegionOffice: string;
}

export class RegisterResponseDto {
  @IsNotEmpty()
  @IsString()
  token: string;
}
