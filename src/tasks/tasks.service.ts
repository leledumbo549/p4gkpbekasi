import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TasksService {
  busy: boolean;

  constructor(
    private prismaService: PrismaService
  ) {
    this.busy = false;
  }


  @Interval(60000)
  async update() {
    if (this.busy) return;
    this.busy = true;

    console.log('update total tiap calon..');

    const rows = await this.prismaService.tblcalon.findMany({
      where: {},
      include: {
        pemilih: true,
      },
    });

    for (const row of rows) {
      let totMJ = 0;
      let totPPJ = 0;
      for (const p of row.pemilih) {
        if (p.posisi === 'PENATUA') totMJ++;
        if (p.posisi === 'PPJ') totPPJ++;
      }

      if (totMJ !== row.Total || totPPJ !== row.TotalPPJ) {
        const result = await this.prismaService.tblcalon.update({
          where: { NoId: row.NoId },
          data: {
            Total: totMJ,
            TotalPPJ: totPPJ,
          },
        });

        console.log(result);
      } else {
      }
    }

    this.busy = false;
  }
}
