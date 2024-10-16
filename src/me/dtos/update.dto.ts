import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  NotEquals,
  ValidateIf,
} from 'class-validator';

export class UpdateInfoBodyDto {
  @NotEquals(null)
  @ValidateIf((_, v) => v !== undefined)
  @IsNotEmpty()
  @IsString()
  name?: string;

  @NotEquals(null)
  @ValidateIf((_, v) => v !== undefined)
  @IsNotEmpty()
  @IsEmail()
  narasarang?: string;

  @NotEquals(null)
  @ValidateIf((_, v) => v !== undefined)
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @NotEquals(null)
  @ValidateIf((_, v) => v !== undefined)
  @IsNotEmpty()
  @IsString()
  address?: string;

  @NotEquals(null)
  @ValidateIf((_, v) => v !== undefined)
  @IsNotEmpty()
  @IsString()
  @Matches(/^20\d{2}\-(0[1-9]|1[0-2])\-(0[1-9]|[1-2][0-9]|3[0-1])$/) // 20XX-XX-XX
  birth?: string;

  @NotEquals(null)
  @ValidateIf((_, v) => v !== undefined)
  @IsNotEmpty()
  @Matches(/^010-\d{4}-\d{4}$/)
  phone?: string;

  @NotEquals(null)
  @ValidateIf((_, v) => v !== undefined)
  @IsNotEmpty()
  @IsString()
  militaryServiceOffice?: string;

  @NotEquals(null)
  @ValidateIf((_, v) => v !== undefined)
  @IsNotEmpty()
  @IsString()
  applicantRegionOffice?: string;
}
