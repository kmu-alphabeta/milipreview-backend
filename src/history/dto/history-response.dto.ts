import { ApiProperty } from "@nestjs/swagger";

export class HistoryResponseDto {
    @ApiProperty()
    id: bigint;
    @ApiProperty()
    userId: bigint;
    @ApiProperty()
    score: number;
    @ApiProperty()
    predictedScore: number;
    @ApiProperty()
    predictedPercent: number;
  }
  