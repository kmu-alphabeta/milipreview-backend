import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryCreateDto } from './dto/history-create.dto';
import { ApiResponse } from '@nestjs/swagger';
import { AuthGuard, AuthRequest } from 'src/auth/auth.guard';
import { History } from 'src/entities/history.entity';

@UseGuards(AuthGuard)
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
    type: [History],
  })
  @Get()
  async getHistoryByUserId(
    @Request() { user }: AuthRequest,
  ): Promise<History[]> {
    return await this.historyService.getHistoryByUserId(user.id);
  }
}
