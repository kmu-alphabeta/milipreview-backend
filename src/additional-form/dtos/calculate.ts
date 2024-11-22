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
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty()
  priority: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty()
  limit: number;
}

export class RequestFormDetail {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RequestFormGroup)
  @ApiProperty({ type: [RequestFormGroup] })
  group?: RequestFormGroup[];

  @IsNumber()
  @Type(() => Number)
  @ApiProperty()
  score: number;
}

export class CalculateBodyDto {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RequestFormDetail)
  @ApiProperty({ type: [RequestFormDetail] })
  form: RequestFormDetail[];
}

export class CalculateResponseDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  token: string;
}
