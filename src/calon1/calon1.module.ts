import { Module } from '@nestjs/common';
import { Calon1Service } from './calon1.service';
import { Calon1Controller } from './calon1.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [Calon1Controller],
  providers: [Calon1Service, PrismaService],
  exports: [Calon1Service],
})
export class Calon1Module {}
