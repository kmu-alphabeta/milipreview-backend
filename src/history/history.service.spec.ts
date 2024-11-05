import { Test, TestingModule } from '@nestjs/testing';
import { EntityManager } from '@mikro-orm/core';
import { HistoryService } from './history.service';
import { History } from '../entities/history.entity';
import { User } from '../entities/user.entity';
import { HistoryCreateDto } from './dto/history-create.dto';
import { NotFoundException } from '@nestjs/common';

describe('HistoryService', () => {
  let service: HistoryService;
  let em: EntityManager;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HistoryService,
        {
          provide: EntityManager,
          useValue: {
            findOne: jest.fn(),
            persistAndFlush: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<HistoryService>(HistoryService);
    em = module.get<EntityManager>(EntityManager);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createHistory', () => {
    it('should create a history record', async () => {
      const dto: HistoryCreateDto = {
        userId: 1n,
        score: 85,
        predictedScore: 90.5,
        predictedPercent: 92.3,
      };

      const mockUser = new User();
      mockUser.id = dto.userId;

      const mockHistory = new History();
      mockHistory.id = 1n; // ID를 수동으로 설정
      mockHistory.user = mockUser;
      mockHistory.score = dto.score;
      mockHistory.predictedScore = dto.predictedScore;
      mockHistory.predictedPercent = dto.predictedPercent;

      // 모킹된 findOne 및 persistAndFlush
      (em.findOne as jest.Mock).mockResolvedValue(mockUser);
      (em.persistAndFlush as jest.Mock).mockImplementation(async (history) => {
        history.id = 1n; // 생성된 history 객체의 ID 설정
        return history;
      });

      const result = await service.createHistory(dto);

      expect(em.findOne).toHaveBeenCalledWith(User, { id: dto.userId });
      expect(em.persistAndFlush).toHaveBeenCalledWith(expect.any(History));
      expect(result).toEqual({
        id: mockHistory.id,
        userId: mockUser.id,
        score: dto.score,
        predictedScore: dto.predictedScore,
        predictedPercent: dto.predictedPercent,
      });
    });


    it('should throw NotFoundException if user is not found', async () => {
      const dto: HistoryCreateDto = {
        userId: 1n,
        score: 85,
        predictedScore: 90.5,
        predictedPercent: 92.3,
      };

      (em.findOne as jest.Mock).mockResolvedValue(null);

      await expect(service.createHistory(dto)).rejects.toThrow(NotFoundException);
      expect(em.findOne).toHaveBeenCalledWith(User, { id: dto.userId });
    });
  });

  describe('getHistoryByUserId', () => {
    it('should return a list of history records', async () => {
      const userId = 1n;

      const mockUser = new User();
      mockUser.id = userId;

      const mockHistories = [
        {
          id: 1n,
          user: mockUser,
          score: 85,
          predictedScore: 90.5,
          predictedPercent: 92.3,
        },
      ];

      (em.findOne as jest.Mock).mockResolvedValue(mockUser);
      (em.find as jest.Mock).mockResolvedValue(mockHistories);

      const result = await service.getHistoryByUserId(userId);

      expect(em.findOne).toHaveBeenCalledWith(User, { id: userId });
      expect(em.find).toHaveBeenCalledWith(History, { user: mockUser });
      expect(result).toEqual(
        mockHistories.map((history) => ({
          id: history.id,
          userId: userId,
          score: history.score,
          predictedScore: history.predictedScore,
          predictedPercent: history.predictedPercent,
        })),
      );
    });

    it('should throw NotFoundException if user is not found', async () => {
      const userId = 1n;

      (em.findOne as jest.Mock).mockResolvedValue(null);

      await expect(service.getHistoryByUserId(userId)).rejects.toThrow(NotFoundException);
      expect(em.findOne).toHaveBeenCalledWith(User, { id: userId });
    });
  });
});
