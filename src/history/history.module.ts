import { Module } from '@nestjs/common';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { History } from '../entities/history.entity';

@Module({
  imports: [MikroOrmModule.forFeature([History])],
  controllers: [HistoryController],
  providers: [HistoryService],
  exports: [HistoryService],
})
export class HistoryModule {}
