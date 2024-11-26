import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PredictionRequestDto } from './dto/prediction-request.dto';
import { PredictionResponseDto } from './dto/prediction-response.dto';
import { lastValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class PredictionService {
  constructor(private readonly httpService: HttpService) {}

  private readonly modelUrl = 'http://127.0.0.1:8000/model'; // Django 서버 URL

  async predict(dto: PredictionRequestDto): Promise<PredictionResponseDto> {
    try {
      // Django 서버로 POST 요청
      const response: AxiosResponse<PredictionResponseDto> =
        await lastValueFrom(
          this.httpService.post<PredictionResponseDto>(this.modelUrl, dto),
        );
      return response.data;
    } catch (error) {
      console.error('Error during prediction request:', error.response?.data || error.message);
      throw new InternalServerErrorException(
        '예측 서버와의 통신 오류가 발생했습니다.',
      );
    }
  }
}
