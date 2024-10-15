import { Module } from '@nestjs/common';
import { AdditionalFormService } from './additional-form.service';
import { AdditionalFormController } from './additional-form.controller';

@Module({
  controllers: [AdditionalFormController],
  providers: [AdditionalFormService],
})
export class AdditionalFormModule {}
