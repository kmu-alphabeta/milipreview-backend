import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class RequestFormGroup {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  priority: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  limit: number;
}

export class RequestFormDetail {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RequestFormGroup)
  group?: RequestFormGroup[];

  @IsNumber()
  @Type(() => Number)
  score: number;
}

export class CalculateBodyDto {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RequestFormDetail)
  form: RequestFormDetail[];
}

export class CalculateResponseDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  token: string;
}
