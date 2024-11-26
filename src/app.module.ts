import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PingModule } from './ping/ping.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AdditionalFormModule } from './additional-form/additional-form.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { HistoryModule } from './history/history.module';
import { PredictionModule } from './prediction/prediction.module';
import { LoggerMiddleware } from './logger.middleware';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MikroOrmModule.forRoot(),
    PingModule,
    AuthModule,
    // CommonFormModule,
    AdditionalFormModule,
    HistoryModule,
    PredictionModule,
    PostModule,
    CommentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
