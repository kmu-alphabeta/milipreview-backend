import { ApiProperty } from '@nestjs/swagger';

export class PredictionRequestDto {
  @ApiProperty()
  year: number;
  @ApiProperty()
  month: number;
  @ApiProperty()
  category: string;
  @ApiProperty()
  score: number;
}
