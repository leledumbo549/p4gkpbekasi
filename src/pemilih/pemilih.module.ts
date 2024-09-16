import { Module } from '@nestjs/common';
import { PemilihController } from './pemilih.controller';
import { PrismaService } from 'src/prisma.service';
import { Calon1Module } from 'src/calon1/calon1.module';

@Module({
  imports: [Calon1Module],
  controllers: [PemilihController],
  providers: [PrismaService],
})

export class PemilihModule { }
