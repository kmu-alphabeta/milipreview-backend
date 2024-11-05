import { Test, TestingModule } from '@nestjs/testing';
import { PredictionController } from './prediction.controller';
import { PredictionService } from './prediction.service';
import { PredictionRequestDto } from './dto/prediction-request.dto';
import { PredictionResponseDto } from './dto/prediction-response.dto';
import { InternalServerErrorException } from '@nestjs/common';

describe('PredictionController', () => {
  let controller: PredictionController;
  let service: PredictionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PredictionController],
      providers: [
        {
          provide: PredictionService,
          useValue: {
            predict: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PredictionController>(PredictionController);
    service = module.get<PredictionService>(PredictionService);
  });

  it('should return prediction result successfully', async () => {
    const dto: PredictionRequestDto = {
      year: 2024,
      month: 5,
      category: '육군/K계열전차승무',
      score: 85,
    };

    const mockResponse: PredictionResponseDto = {
      predictedCutoff: 80,
      isPassed: true,
      probability: 95,
    };

    jest.spyOn(service, 'predict').mockResolvedValue(mockResponse);

    const result = await controller.getPrediction(dto);

    expect(service.predict).toHaveBeenCalledWith(dto);
    expect(result).toEqual(mockResponse);
  });

  it('should throw InternalServerErrorException if prediction fails', async () => {
    const dto: PredictionRequestDto = {
      year: 2024,
      month: 5,
      category: '육군/K계열전차승무',
      score: 85,
    };

    jest.spyOn(service, 'predict').mockRejectedValue(new InternalServerErrorException());

    await expect(controller.getPrediction(dto)).rejects.toThrow(InternalServerErrorException);
    expect(service.predict).toHaveBeenCalledWith(dto);
  });
});
