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

    return ret;
  }
}
