import { ApiProperty } from '@nestjs/swagger';

export class HistoryResponseDto {
  @ApiProperty({ description: '예측 히스토리 ID' })
  id: bigint;
  @ApiProperty({ description: '유저의 점수' })
  score: number;
  @ApiProperty({ description: '예측한 합격컷' })
  predictedCutoff: number;
  @ApiProperty({ description: '예측 합격 확률' })
  probability: number;
  @ApiProperty({ description: '예측 결과 (유저 점수가 합격컷을 넘겼는가)' })
  isPassed: boolean;
  @ApiProperty({ description: '예측 히스토리 생성 시각', example: '2024-11-22 18:34' })
  timestamp: string;
}
  