import { Module } from '@nestjs/common';
import { AdditionalFormService } from './additional-form.service';
import { AdditionalFormController } from './additional-form.controller';
import { PredictionModule } from '../prediction/prediction.module';
import { HistoryModule } from '../history/history.module';

@Module({
  controllers: [AdditionalFormController],
  providers: [AdditionalFormService],
  imports: [PredictionModule, HistoryModule],
})
export class AdditionalFormModule {}
