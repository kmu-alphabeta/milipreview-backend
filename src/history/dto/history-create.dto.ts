import { ApiProperty } from '@nestjs/swagger';

export class HistoryCreateDto {
  @ApiProperty()
  score: number;
  @ApiProperty()
  predictedScore: number;
  @ApiProperty()
  predictedPercent: number;
}
