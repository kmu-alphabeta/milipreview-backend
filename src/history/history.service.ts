import { Injectable } from '@nestjs/common';
import { History } from '../entities/history.entity';
import { HistoryCreateDto } from './dto/history-create.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { HistoryResponseDto } from './dto/history-response.dto';
import * as moment from 'moment-timezone';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private readonly historyRepository: EntityRepository<History>,
  ) {}

  // 예측 히스토리 생성
  async createHistory(userId: bigint, dto: HistoryCreateDto): Promise<bigint> {
    return await this.historyRepository.insert({
      ...dto,
      user: userId,
      timestamp: new Date(),
    });
  }

  // 예측 히스토리 조회
  async getHistoryByUserId(userId: bigint): Promise<HistoryResponseDto[]> {
    const histories = await this.historyRepository.findAll({
      where: {
        user: userId,
      },
    });
    return histories.map((history) => {
      return {
        id: history.id,
        score: history.score,
        predictedCutoff: history.predictedCutoff,
        probability: history.probability,
        isPassed: history.score >= history.predictedCutoff,
        timestamp: moment(history.timestamp).tz('Asia/Seoul').format('YYYY-MM-DD HH:mm'),
      };
    });
  }
}
