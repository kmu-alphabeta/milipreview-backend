import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PingModule } from './ping/ping.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { CommonFormModule } from './common-form/common-form.module';
import { AdditionalFormModule } from './additional-form/additional-form.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MeModule } from './me/me.module';
import { HistoryController } from './history/history.controller';
import { HistoryService } from './history/history.service';
import { HistoryModule } from './history/history.module';
import { PredictionModule } from './prediction/prediction.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MikroOrmModule.forRoot(),
    PingModule,
    AuthModule,
    CommonFormModule,
    AdditionalFormModule,
    MeModule,
    HistoryModule,
    PredictionModule,
  ],
  controllers: [AppController, HistoryController],
  providers: [AppService, HistoryService],
})
export class AppModule {}
