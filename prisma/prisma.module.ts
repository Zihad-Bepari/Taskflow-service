import 'dotenv/config';// src/prisma/prisma.module.ts
import { Global, Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Global() 
@Module({
  providers: [
    {
      provide: PrismaClient,
      useValue: new PrismaClient(), // single instance
    },
  ],
  exports: [PrismaClient], // so other modules can inject PrismaClient
})
export class PrismaModule {}
