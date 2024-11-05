import { Module } from '@nestjs/common';
import { CommonFormService } from './common-form.service';
import { CommonFormController } from './common-form.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { CommonForm } from '../entities/common-form.entity';
import { User } from '../entities/user.entity';

@Module({
  imports: [MikroOrmModule.forFeature([CommonForm, User])], // 추가된 부분
  controllers: [CommonFormController],
  providers: [CommonFormService],
  exports: [CommonFormService],
})
export class CommonFormModule {}