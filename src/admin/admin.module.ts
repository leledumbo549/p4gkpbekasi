import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { PrismaService } from 'src/prisma.service';
import { Calon1Module } from 'src/calon1/calon1.module';

@Module({
  imports: [Calon1Module],
  controllers: [AdminController],
  providers: [AdminService, PrismaService],
})
export class AdminModule { }
