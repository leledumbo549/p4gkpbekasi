import { Controller, Get } from '@nestjs/common';
import { AdminService } from './admin.service';
import { PrismaService } from 'src/prisma.service';
import { Calon1Service } from 'src/calon1/calon1.service';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private prismaService: PrismaService,
    private calon1Service: Calon1Service,
  ) {}

  @Get('updatetotal')
  async updateTotal() {
    const rows = await this.prismaService.tblcalon.findMany({});
    const ret = [];
    for (const row of rows) {
      const result = await this.calon1Service.updateTotal(row.NoId);
      if (result.Total > 0 || result.TotalPPJ > 0) ret.push(result);
    }

    return [];
  }

  @Get('belumMilih')
  async belumMilih() {
    const prisma = this.prismaService;
    const rows: Array<any> =
      await prisma.$queryRaw`SELECT tblpemilih.otp, tblpemilih.NoReg, tblpemilih.nohp, tblpemilih.Nama, tblpemilih.Wil, KirimPesan.id AS kpId, COALESCE(KirimPesan.jumlahKirim,0) AS jumlahKirim, COALESCE(KirimPesan.updatedAt,( CURRENT_DATE - INTERVAL 1 MONTH)) AS updatedAt FROM tblpemilih LEFT JOIN PilihanKedua ON PilihanKedua.pemilihNoReg = tblpemilih.NoReg LEFT JOIN KirimPesan ON KirimPesan.nohp = tblpemilih.nohp WHERE PilihanKedua.pemilihNoReg IS NULL ORDER BY updatedAt ASC LIMIT 5`;

    for (let i = 0; i < rows.length; i++) {
      console.log(rows[i]);
      let kpId = rows[i].kpId;
      const jumlahKirim = rows[i].jumlahKirim;
      let otp = rows[i].otp;
      const NoReg = rows[i].NoReg;

      const otpOK = otp && otp.length === 6;
      if (!otpOK) {
        otp = (Math.floor(Math.random() * 999999) + '').padStart(6, '0');
        await prisma.tblpemilih.update({
          data: {
            otp: otp,
          },
          where: {
            NoReg: NoReg,
          },
        });
        rows[i].otp = otp;
      }

      if (!kpId) {
        const newObj = await prisma.kirimPesan.create({
          data: { nohp: rows[i].nohp, jumlahKirim: 0 },
        });
        kpId = newObj.id;
      }

      await prisma.kirimPesan.update({
        where: { id: kpId },
        data: { jumlahKirim: jumlahKirim + 1 },
      });
      console.log(kpId);
    }
    return {
      rows,
    };
  }
}
