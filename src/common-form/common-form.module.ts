import { Module } from '@nestjs/common';
import { CommonFormService } from './common-form.service';
import { CommonFormController } from './common-form.controller';

@Module({
  controllers: [CommonFormController],
  providers: [CommonFormService],
})
export class CommonFormModule {}
