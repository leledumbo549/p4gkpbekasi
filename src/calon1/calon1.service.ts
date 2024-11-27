import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class Calon1Service {
  constructor(private prismaService: PrismaService) { }

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

  async updateTotal2() {
    const rows = await this.prismaService.tblcalon2.findMany({
      include: {
        pemilih: true,
      },
    });

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      await this.prismaService.tblcalon2.update({
        where: { NoId: row.NoId },
        data: {
          Total: row.pemilih.length
        },
      });
    }
  }

}
