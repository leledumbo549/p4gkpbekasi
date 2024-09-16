import { Module } from '@nestjs/common';
import { WabotService } from './wabot.service';
import { WabotController } from './wabot.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [WabotController],
  providers: [WabotService, PrismaService],
})
export class WabotModule { }
