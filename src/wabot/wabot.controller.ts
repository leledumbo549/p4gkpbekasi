import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WabotService } from './wabot.service';
import { PrismaService } from 'src/prisma.service';

@Controller('wabot')
export class WabotController {
  constructor(
    private readonly wabotService: WabotService,
    private prismaService: PrismaService
  ) { }

  @Get(':nohp')
  async findOne(@Param('nohp') nohp: string) {
    const p = await this.prismaService.tblpemilih.findFirst({ where: { nohp } })
    const otp = p.otp;
    const name = p.Nama;
    const wilayah = p.Wil;
    return { otp, name, wilayah, nohp };
  }

}
