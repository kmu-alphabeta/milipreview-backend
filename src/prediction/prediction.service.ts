import {
  Injectable,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PredictionRequestDto } from './dto/prediction-request.dto';
import { PredictionResponseDto } from './dto/prediction-response.dto';
import { lastValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class PredictionService {
  constructor(
    private readonly httpService: HttpService,
    @Inject('MODEL_URL') private readonly modelUrl: string, // 모델 URL을 주입받음
  ) {}

  async predict(dto: PredictionRequestDto): Promise<PredictionResponseDto> {
    if (!this.modelUrl) {
      if (process.env.NODE_ENV === 'development') {
        return {
          predictedCutoff: dto.score,
          isPassed: true,
          probability: 1,
        };
      }
      throw new InternalServerErrorException(
        '모델 서버 주소가 설정되지 않았습니다.',
      );
    }

    try {
      const response: AxiosResponse<PredictionResponseDto> =
        await lastValueFrom(
          this.httpService.post<PredictionResponseDto>(
            `${this.modelUrl}/predict`,
            dto,
          ),
        );
      return response.data;
    } catch (error) {
      console.error('Error during prediction request:', error);
      throw new InternalServerErrorException(
        '예측 서버와의 통신 오류가 발생했습니다.',
      );
    }
  }
}
