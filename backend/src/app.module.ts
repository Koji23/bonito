import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovementsController } from './movements/movements.controller';
import { MovementsService } from './movements/movements.service';
import { MovementsModule } from './movements/movements.module';

@Module({
  imports: [MovementsModule],
  controllers: [AppController],
  providers: [AppService], // Providers can inject dependencies. This means that objects can create various relationships to each other. And the Nest.js runtime system will handle the logic of wiring up instances of objects together for you
})
export class AppModule {}
