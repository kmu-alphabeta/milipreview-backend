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
  @IsDate()
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
