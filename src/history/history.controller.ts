import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryCreateDto } from './dto/history-create.dto';
import { HistoryResponseDto } from './dto/history-response.dto';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  // 예측 히스토리 생성
  @Post()
  async createHistory(@Body() dto: HistoryCreateDto): Promise<HistoryResponseDto> {
    return await this.historyService.createHistory(dto);
  }

  // 예측 히스토리 조회
  @Get(':userId')
  async getHistoryByUserId(@Param('userId') userId: bigint): Promise<HistoryResponseDto[]> {
    return await this.historyService.getHistoryByUserId(userId);
  }
}
