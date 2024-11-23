import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PredictionController } from './prediction.controller';
import { PredictionService } from './prediction.service';

@Module({
  imports: [HttpModule, ConfigModule], // ConfigModule 추가
  controllers: [PredictionController],
  providers: [
    PredictionService,
    {
      provide: 'MODEL_URL',
      useFactory: (configService: ConfigService) => configService.get<string>('MODEL_URL'),
      inject: [ConfigService],
    },
  ],
  exports: [PredictionService],
})
export class PredictionModule {}