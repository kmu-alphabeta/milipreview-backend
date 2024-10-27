import { Test, TestingModule } from '@nestjs/testing';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
import { HistoryCreateDto } from './dto/history-create.dto';
import { HistoryResponseDto } from './dto/history-response.dto';
import { NotFoundException } from '@nestjs/common';

describe('HistoryController', () => {
  let controller: HistoryController;
  let service: HistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoryController],
      providers: [
        {
          provide: HistoryService,
          useValue: {
            createHistory: jest.fn(),
            getHistoryByUserId: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<HistoryController>(HistoryController);
    service = module.get<HistoryService>(HistoryService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createHistory', () => {
    it('should create and return a history record', async () => {
      const dto: HistoryCreateDto = {
        userId: 1n,
        score: 85,
        predictedScore: 90.5,
        predictedPercent: 92.3,
      };

      const mockResponse: HistoryResponseDto = {
        id: 1n,
        userId: dto.userId,
        score: dto.score,
        predictedScore: dto.predictedScore,
        predictedPercent: dto.predictedPercent,
      };

      (service.createHistory as jest.Mock).mockResolvedValue(mockResponse);

      const result = await controller.createHistory(dto);

      expect(service.createHistory).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockResponse);
    });

    it('should throw NotFoundException if user is not found', async () => {
      const dto: HistoryCreateDto = {
        userId: 1n,
        score: 85,
        predictedScore: 90.5,
        predictedPercent: 92.3,
      };

      (service.createHistory as jest.Mock).mockRejectedValue(new NotFoundException());

      await expect(controller.createHistory(dto)).rejects.toThrow(NotFoundException);
      expect(service.createHistory).toHaveBeenCalledWith(dto);
    });
  });

  describe('getHistoryByUserId', () => {
    it('should return a list of history records for a user', async () => {
      const userId = 1n;

      const mockResponse: HistoryResponseDto[] = [
        {
          id: 1n,
          userId: userId,
          score: 85,
          predictedScore: 90.5,
          predictedPercent: 92.3,
        },
      ];

      (service.getHistoryByUserId as jest.Mock).mockResolvedValue(mockResponse);

      const result = await controller.getHistoryByUserId(userId);

      expect(service.getHistoryByUserId).toHaveBeenCalledWith(userId);
      expect(result).toEqual(mockResponse);
    });

    it('should throw NotFoundException if user is not found', async () => {
      const userId = 1n;

      (service.getHistoryByUserId as jest.Mock).mockRejectedValue(new NotFoundException());

      await expect(controller.getHistoryByUserId(userId)).rejects.toThrow(NotFoundException);
      expect(service.getHistoryByUserId).toHaveBeenCalledWith(userId);
    });
  });
});
