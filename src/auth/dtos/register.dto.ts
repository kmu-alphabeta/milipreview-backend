import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterBodyDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  narasarang: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  address: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^20\d{2}\-(0[1-9]|1[0-2])\-(0[1-9]|[1-2][0-9]|3[0-1])$/) // 20XX-XX-XX
  @ApiProperty()
  birth: string;

  @IsNotEmpty()
  @Matches(/^010-\d{4}-\d{4}$/)
  @ApiProperty()
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
  @ApiProperty()
  token: string;
}
