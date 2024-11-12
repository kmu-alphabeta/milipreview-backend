import { IsBoolean, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from "@nestjs/swagger";

export class CreateCommonFormDto {
  @Type(() => Number)
  @IsInt()
  @ApiProperty()
  careerMonths: number;

  @Type(() => Number)
  @IsInt()
  @ApiProperty()
  hsAbsenceDays: number;

  @Type(() => Number)
  @IsInt()
  @ApiProperty()
  techCertificates: number;

  @Type(() => Number)
  @IsInt()
  @ApiProperty()
  majorDepartment: number;

  @Type(() => Number)
  @IsInt()
  @ApiProperty()
  volunteerScore: number;

  @Type(() => Number)
  @IsInt()
  @ApiProperty()
  bloodDonation: number;

  @Type(() => Boolean)
  @IsBoolean()
  @ApiProperty()
  nationalMerit: boolean;

  @Type(() => Boolean)
  @IsBoolean()
  @ApiProperty()
  independenceMerit: boolean;

  @Type(() => Number)
  @IsInt()
  @ApiProperty()
  corpExpScore: number;

  @Type(() => Number)
  @IsInt()
  @ApiProperty()
  indivExpScore: number;

  @Type(() => Number)
  @IsInt()
  @ApiProperty()
  multiChildScore: number;

  @Type(() => Boolean)
  @IsBoolean()
  @ApiProperty()
  careerApply: boolean;

  @Type(() => Boolean)
  @IsBoolean()
  @ApiProperty()
  overseasApply: boolean;

  @Type(() => Boolean)
  @IsBoolean()
  @ApiProperty()
  medicalApply: boolean;

  @Type(() => Boolean)
  @IsBoolean()
  @ApiProperty()
  is_livelihood_recipient: boolean;
}
