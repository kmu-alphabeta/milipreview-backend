import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { History } from '../entities/history.entity';
import { User } from '../entities/user.entity';
import { HistoryCreateDto } from './dto/history-create.dto';
import { HistoryResponseDto } from './dto/history-response.dto';

@Injectable()
export class HistoryService {
  constructor(
    private readonly em: EntityManager,
  ) {}

  // 예측 히스토리 생성
  async createHistory(dto: HistoryCreateDto): Promise<HistoryResponseDto> {
    const user = await this.em.findOne(User, { id: dto.userId });
    if (!user) {
      throw new NotFoundException(`User with ID ${dto.userId} not found`);
    }

    const history = new History();
    history.user = user;
    history.score = dto.score;
    history.predictedScore = dto.predictedScore;
    history.predictedPercent = dto.predictedPercent;

    await this.em.persistAndFlush(history);

    return {
      id: history.id,
      userId: user.id,
      score: history.score,
      predictedScore: history.predictedScore,
      predictedPercent: history.predictedPercent,
    };
  }

  // 예측 히스토리 조회
  async getHistoryByUserId(userId: bigint): Promise<HistoryResponseDto[]> {
    const user = await this.em.findOne(User, { id: userId });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const histories = await this.em.find(History, { user: user });
    return histories.map((history) => ({
      id: history.id,
      userId: user.id,
      score: history.score,
      predictedScore: history.predictedScore,
      predictedPercent: history.predictedPercent,
    }));
  }
}
