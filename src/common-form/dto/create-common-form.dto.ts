import { IsBoolean, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCommonFormDto {
  @Type(() => Number)
  @IsInt()
  careerMonths: number;

  @Type(() => Number)
  @IsInt()
  hsAbsenceDays: number;

  @Type(() => Number)
  @IsInt()
  techCertificates: number;

  @Type(() => Number)
  @IsInt()
  majorDepartment: number;

  @Type(() => Number)
  @IsInt()
  volunteerScore: number;

  @Type(() => Number)
  @IsInt()
  bloodDonation: number;

  @Type(() => Boolean)
  @IsBoolean()
  nationalMerit: boolean;

  @Type(() => Boolean)
  @IsBoolean()
  independenceMerit: boolean;

  @Type(() => Number)
  @IsInt()
  corpExpScore: number;

  @Type(() => Number)
  @IsInt()
  indivExpScore: number;

  @Type(() => Number)
  @IsInt()
  multiChildScore: number;

  @Type(() => Boolean)
  @IsBoolean()
  careerApply: boolean;

  @Type(() => Boolean)
  @IsBoolean()
  overseasApply: boolean;

  @Type(() => Boolean)
  @IsBoolean()
  medicalApply: boolean;

  @Type(() => Boolean)
  @IsBoolean()
  is_livelihood_recipient: boolean;
}
