import { Global,Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { PrismaClient } from '@prisma/client';
import { PrismaModule } from '../../prisma/prisma.module';


@Global()
@Module({
  imports: [PrismaClient,PrismaModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
