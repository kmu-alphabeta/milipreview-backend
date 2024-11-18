import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { PredictionService } from './prediction.service';
import { PredictionRequestDto } from './dto/prediction-request.dto';
import { PredictionResponseDto } from './dto/prediction-response.dto';
import { ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('prediction')
export class PredictionController {
  constructor(private readonly predictionService: PredictionService) {}

  @ApiResponse({
    status: 201,
    type: PredictionResponseDto,
  })
  @Post()
  async getPrediction(
    @Body() dto: PredictionRequestDto,
  ): Promise<PredictionResponseDto> {
    return this.predictionService.predict(dto);
  }
}
