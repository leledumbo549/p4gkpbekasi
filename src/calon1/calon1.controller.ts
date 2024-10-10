import { Controller, Get, Query } from '@nestjs/common';
import { Calon1Service } from './calon1.service';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as moment from 'moment';

class FindAllDTO {
  @ApiProperty({ default: 'ALL', required: false })
  @IsOptional()
  @IsString()
  wilayah: string;
}

@Controller('calon1')
export class Calon1Controller {
  constructor(
    private readonly calon1Service: Calon1Service,
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  @Get('/votes')
  async findVotes(@Query() dto: FindAllDTO) {
    let where = {};

    if (dto.wilayah && dto.wilayah.length === 2)
      where = {
        pemilih: {
          Wil: dto.wilayah,
        },
      };

    const args = {
      where,
      include: {
        calon: true,
        pemilih: true,
      },
    };
    const rows = await this.prismaService.pilihanPertama.findMany(args);

    // <td>{row.pemilih.Wil}</td>
    // <td>{row.pemilih.Nama}</td>
    // <td>{row.calon.Nama}</td>
    // <td>{row.posisi}</td>
    // <td>{row.calon.Wil}</td>
    // <td>{row.createdAt}</td>
    const result = rows.map((row) => {
      return {
        id: row.id,
        pemilihWil: row.pemilih.Wil,
        pemilihNama: row.pemilih.Nama,
        calonWil: row.calon.Wil,
        calonNama: row.calon.Nama,
        posisi: row.posisi,
        createdAt: moment(row.createdAt).format('DD-MM-YYYY HH:mm:ss'),
      };
    });
    // return result;
    return [];
  }

  @Get('/list')
  async findAll(@Query() dto: FindAllDTO) {
    let where = {};
    if (dto.wilayah && dto.wilayah.length === 2) where = { Wil: dto.wilayah };
    const args = {
      where,
    };
    const result = await this.prismaService.tblcalon.findMany(args);
    // return result;
    return [];
  }
}
