import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class Calon1Service {
  constructor(private prismaService: PrismaService) {}

  async updateTotal(NoId: string) {
    const obj = await this.prismaService.tblcalon.findUnique({
      where: { NoId },
      include: {
        pemilih: true,
      },
    });

    let totMJ = 0;
    let totPPJ = 0;
    for (const p of obj.pemilih) {
      if (p.posisi === 'PENATUA') totMJ++;
      if (p.posisi === 'PPJ') totPPJ++;
    }

    const result = await this.prismaService.tblcalon.update({
      where: { NoId },
      data: {
        Total: totMJ,
        TotalPPJ: totPPJ,
      },
    });

    return result;
  }
}
