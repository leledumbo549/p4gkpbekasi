import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TasksService {
  busy: boolean;

  constructor(private prismaService: PrismaService) {
    this.busy = false;
  }

  // @Interval(180000)
  // async update() {
  //   if (this.busy) return;
  //   this.busy = true;

  //   console.log('update total tiap calon..');

  //   const rows = await this.prismaService.tblcalon.findMany({
  //     where: {},
  //     include: {
  //       pemilih: true,
  //     },
  //   });

  //   console.log(rows.length);

  //   for (const row of rows) {
  //     let totMJ = 0;
  //     let totPPJ = 0;
  //     for (const p of row.pemilih) {
  //       if (p.posisi === 'PENATUA') totMJ++;
  //       if (p.posisi === 'PPJ') totPPJ++;
  //     }

  //     if (totMJ !== row.Total || totPPJ !== row.TotalPPJ) {
  //       const result = await this.prismaService.tblcalon.update({
  //         where: { NoId: row.NoId },
  //         data: {
  //           Total: totMJ,
  //           TotalPPJ: totPPJ,
  //         },
  //       });

  //       console.log(result);
  //     } else {
  //     }
  //   }

  //   this.busy = false;
  // }

  @Interval(180000)
  async update2() {
    if (this.busy) return;
    this.busy = true;

    console.log('update total tiap calon..');

    const rows = await this.prismaService.tblcalon2.findMany({
      where: {},
      include: {
        pemilih: true,
      },
    });

    console.log(rows.length);

    for (const row of rows) {
      const total =
        row.pemilih && row.pemilih.length > 0 ? row.pemilih.length : 0;

      if (total !== row.Total) {
        const result = await this.prismaService.tblcalon2.update({
          where: { NoId: row.NoId },
          data: {
            Total: total,
          },
        });

        console.log(result);
      } else {
      }
    }

    this.busy = false;
  }
}
