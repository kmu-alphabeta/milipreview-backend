import { Test, TestingModule } from '@nestjs/testing';
import { PredictionService } from './prediction.service';
import { HttpService } from '@nestjs/axios';
import { PredictionRequestDto } from './dto/prediction-request.dto';
import { PredictionResponseDto } from './dto/prediction-response.dto';
import { of } from 'rxjs';
import { AxiosResponse, AxiosHeaders } from 'axios';
import { InternalServerErrorException } from '@nestjs/common';

describe('PredictionService', () => {
  let service: PredictionService;
  let httpService: HttpService;
  const modelUrl = 'http://example.com';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PredictionService,
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(),
          },
        },
        {
          provide: 'MODEL_URL',
          useValue: modelUrl, // 모델 URL 주입
        },
      ],
    }).compile();

    service = module.get<PredictionService>(PredictionService);
    httpService = module.get<HttpService>(HttpService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return prediction result successfully', async () => {
    const dto: PredictionRequestDto = {
      year: 2024,
      month: 5,
      category: '육군/K계열전차승무',
      score: 85,
    };

    const mockResponse: AxiosResponse<PredictionResponseDto> = {
      data: {
        predictedCutoff: 80,
        isPassed: true,
        probability: 95,
      },
      status: 200,
      statusText: 'OK',
      headers: new AxiosHeaders(),
      config: { headers: new AxiosHeaders() },
    };

    jest.spyOn(httpService, 'post').mockReturnValue(of(mockResponse));

    const result = await service.predict(dto);

    expect(httpService.post).toHaveBeenCalledWith(`${modelUrl}/predict`, dto);
    expect(result).toEqual({
      predictedCutoff: 80,
      isPassed: true,
      probability: 95,
    });
  });

  it('should throw InternalServerErrorException if model URL is not set', async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PredictionService,
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(),
          },
        },
        {
          provide: 'MODEL_URL',
          useValue: '',
        },
      ],
    }).compile();

    const serviceWithoutUrl = module.get<PredictionService>(PredictionService);

    await expect(serviceWithoutUrl.predict({
      year: 2024,
      month: 5,
      category: '육군/K계열전차승무',
      score: 85,
    })).rejects.toThrow(InternalServerErrorException);
  });

  it('should throw InternalServerErrorException if request fails', async () => {
    const dto: PredictionRequestDto = {
      year: 2024,
      month: 5,
      category: '육군/K계열전차승무',
      score: 85,
    };

    jest.spyOn(httpService, 'post').mockImplementation(() => {
      throw new Error('Request failed');
    });

    await expect(service.predict(dto)).rejects.toThrow(InternalServerErrorException);
  });
});
