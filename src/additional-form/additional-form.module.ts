import { Module } from '@nestjs/common';
import { AdditionalFormService } from './additional-form.service';
import { AdditionalFormController } from './additional-form.controller';
import { PredictionModule } from '../prediction/prediction.module';

@Module({
  controllers: [AdditionalFormController],
  providers: [AdditionalFormService],
  imports: [PredictionModule],
})
export class AdditionalFormModule {}
