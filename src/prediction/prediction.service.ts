import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { PredictionRequestDto } from './dto/prediction-request.dto';
import { PredictionResponseDto } from './dto/prediction-response.dto';
import { AxiosResponse } from 'axios';

@Injectable()
export class PredictionService {
  constructor(private readonly httpService: HttpService) {}

  private readonly modelUrl = 'http://127.0.0.1:8000/models'; // Django 서버 URL

  async predict(dto: PredictionRequestDto): Promise<PredictionResponseDto> {
    console.log('Prediction request DTO:', JSON.stringify(dto)); // 요청 데이터 로깅

    try {
      // Django 서버로 POST 요청
      const response: AxiosResponse<PredictionResponseDto> =
        await lastValueFrom(
          this.httpService.post<PredictionResponseDto>(this.modelUrl, dto),
        );

      console.log('Prediction response data:', JSON.stringify(response.data)); // 응답 데이터 로깅
      return response.data;

    } catch (error) {
      // 에러 발생 시 요청 및 응답 로깅
      console.error('Error during prediction request:', {
        message: error.message,
        config: error.config, // 요청 설정 정보
        request: error.request, // 요청 본문
        response: error.response?.data, // 응답 본문
        status: error.response?.status, // HTTP 상태 코드
      });

      throw new InternalServerErrorException(
        '예측 서버와의 통신 오류가 발생했습니다.',
      );
    }
  }
}
