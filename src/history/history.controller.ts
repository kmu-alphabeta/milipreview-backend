import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryCreateDto } from './dto/history-create.dto';
import { HistoryResponseDto } from './dto/history-response.dto';
import { ApiResponse } from "@nestjs/swagger";

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  // 예측 히스토리 생성
  @ApiResponse({
    type: HistoryResponseDto,
  })
  @Post()
  async createHistory(@Body() dto: HistoryCreateDto): Promise<HistoryResponseDto> {
    return await this.historyService.createHistory(dto);
  }

  // 예측 히스토리 조회
  @ApiResponse({
    type: [HistoryResponseDto],
  })
  @Get(':userId')
  async getHistoryByUserId(@Param('userId') userId: bigint): Promise<HistoryResponseDto[]> {
    return await this.historyService.getHistoryByUserId(userId);
  }
}
