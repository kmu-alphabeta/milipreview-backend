import { ApiProperty } from '@nestjs/swagger';

export class PredictionResponseDto {
  @ApiProperty()
  predictedCutoff: number;
  @ApiProperty()
  isPassed: boolean;
  @ApiProperty()
  probability: number;
}
