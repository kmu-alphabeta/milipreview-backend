import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PingModule } from './ping/ping.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { CommonFormModule } from './common-form/common-form.module';
import { AdditionalFormModule } from './additional-form/additional-form.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MikroOrmModule.forRoot(),
    PingModule,
    AuthModule,
    CommonFormModule,
    AdditionalFormModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
