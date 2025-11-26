import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { PrismaClient } from '@prisma/client';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [TaskModule,PrismaModule,PrismaClient],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
