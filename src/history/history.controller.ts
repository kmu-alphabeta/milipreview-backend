import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryCreateDto } from './dto/history-create.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AuthGuard, AuthRequest } from 'src/auth/auth.guard';
import { HistoryResponseDto } from './dto/history-response.dto';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  // 예측 히스토리 생성
  @ApiResponse({
    type: BigInt,
  })
  @Post()
  async createHistory(
    @Request() { user }: AuthRequest,
    @Body() dto: HistoryCreateDto,
  ): Promise<bigint> {
    return await this.historyService.createHistory(user.id, dto);
  }

  // 예측 히스토리 조회
  @ApiResponse({
    type: [HistoryResponseDto],
  })
  @Get()
  async getHistoryByUserId(
    @Request() { user }: AuthRequest,
  ): Promise<HistoryResponseDto[]> {
    return await this.historyService.getHistoryByUserId(user.id);
  }
}
