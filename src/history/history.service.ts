import { Injectable } from '@nestjs/common';
import { History } from '../entities/history.entity';
import { HistoryCreateDto } from './dto/history-create.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';

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
    });
  }

  // 예측 히스토리 조회
  async getHistoryByUserId(userId: bigint): Promise<History[]> {
    return await this.historyRepository.findAll({
      where: {
        user: userId,
      },
    });
  }
}
