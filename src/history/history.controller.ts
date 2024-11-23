import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryCreateDto } from './dto/history-create.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard, AuthRequest } from 'src/auth/auth.guard';
import { HistoryResponseDto } from './dto/history-response.dto';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  // 예측 히스토리 생성
  @ApiOperation({ description: '요청한 유저 히스토리 등록; 테스트 전용. `/form/calculate` 호출 시 자동으로 진행됨', deprecated: true })
  @ApiResponse({
    type: BigInt,
    description: '생성된 히스토리 ID. 필요 없으면 리턴값 사용하지 않아도 됨.',
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
  @ApiOperation({ description: '요청한 유저 ID의 모든 히스토리 조회: DTO 스키마 확인' })
  @Get()
  async getHistoryByUserId(
    @Request() { user }: AuthRequest,
  ): Promise<HistoryResponseDto[]> {
    return await this.historyService.getHistoryByUserId(user.id);
  }
}
