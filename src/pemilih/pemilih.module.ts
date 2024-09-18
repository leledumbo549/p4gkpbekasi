import { Module } from '@nestjs/common';
import { PemilihController } from './pemilih.controller';
import { PrismaService } from 'src/prisma.service';
import { Calon1Module } from 'src/calon1/calon1.module';
import { WabotModule } from 'src/wabot/wabot.module';

@Module({
  imports: [Calon1Module, WabotModule],
  controllers: [PemilihController],
  providers: [PrismaService],
})
export class PemilihModule {}
