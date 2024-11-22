import { ApiProperty } from '@nestjs/swagger';

export class HistoryCreateDto {
  @ApiProperty({ description: '유저의 점수' })
  score: number;
  @ApiProperty({ description: '예측한 합격컷' })
  predictedCutoff: number;
  @ApiProperty({ description: '예측 합격 확률' })
  probability: number;
}
