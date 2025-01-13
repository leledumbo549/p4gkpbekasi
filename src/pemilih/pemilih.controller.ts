import {
  Controller,
  Get,
  UseGuards,
  Request,
  Param,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
// import axios from 'axios';
import { AuthGuard } from 'src/auth/auth.guard';
import { Calon1Service } from 'src/calon1/calon1.service';
import { PrismaService } from 'src/prisma.service';
import { WabotService } from 'src/wabot/wabot.service';
import * as _ from 'lodash';

@Controller('pemilih')
export class PemilihController {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private calon1Service: Calon1Service,
    private wabotService: WabotService,
  ) {}

  @Get('notelpon/:nohp')
  async notelpon(@Param('nohp') nohp: string) {
    try {
      const p = await this.prismaService.pengaturan.findFirst();
      const open = p.openPemilihan1 === true;
      const open2 = p.openPemilihan2 === true;
      const where: Prisma.tblpemilihWhereInput = { nohp };
      const result = await this.prismaService.tblpemilih.findFirst({
        where,
        include: {
          pilihanPertama: true,
          pilihanKedua: true,
          pilihanKeduaPPJ: true,
        },
      });

      if (!result) throw new Error('invalid phone number');
      return {
        NoReg: result.NoReg.trim(),
        phoneNum: result.nohp.trim(),
        name: result.Nama.trim(),
        wilayah: result.Wil.trim(),
        voted1: result.pilihanPertama.length > 0,
        voted2: result.pilihanKedua.length > 0,
        open,
        open2,
      };
    } catch (err) {
      const errMsg = err && err.message ? err.message : 'unknown error';
      throw new HttpException(errMsg, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('pemilih/:noreg')
  async pemilih(@Param('noreg') noReg: string) {
    const p = await this.prismaService.pengaturan.findFirst();
    console.log(p);
    const open = p.openPemilihan1 === true;
    const open2 = p.openPemilihan2 === true;
    const where: Prisma.tblpemilihWhereUniqueInput = { NoReg: noReg };
    const result = await this.prismaService.tblpemilih.findUnique({
      where,
      include: {
        pilihanPertama: true,
        pilihanKedua: true,
        pilihanKeduaPPJ: true,
      },
    });
    return {
      NoReg: result.NoReg.trim(),
      phoneNum: result.nohp.trim(),
      name: result.Nama.trim(),
      wilayah: result.Wil.trim(),
      voted1: result.pilihanPertama.length > 0,
      voted2: result.pilihanKedua.length > 0,
      open,
      open2,
    };
  }

  @Get('sendotp/:noreg')
  async sendotp(@Param('noreg') noReg: string) {
    const where: Prisma.tblpemilihWhereUniqueInput = { NoReg: noReg };
    const result = await this.prismaService.tblpemilih.findUnique({
      where,
      include: {
        pilihanPertama: true,
        pilihanKedua: true,
        pilihanKeduaPPJ: true,
      },
    });

    // const notVoted = result.pilihanPertama.length === 0;
    // if (!notVoted) throw new Error('invalid sendotp');

    const numSent = result.numSent;
    const NoReg = result.NoReg;

    let otp = result.otp;
    const nohp = result.nohp.trim();

    if (!otp) {
      otp = (Math.floor(Math.random() * 999999) + '').padStart(6, '0');
      await this.prismaService.tblpemilih.update({
        data: {
          nohp: result.nohp.trim(),
          otp,
        },
        where,
      });
    }

    const ret = {
      sent: false,
      otp,
      numSent,
    };

    // todo: send otp
    // const name = result.Nama;
    // const wilayah = result.Wil;
    // let msg =
    //   name + ' dari wilayah ' + wilayah + ', kode rahasia Anda adalah: ' + otp;
    // msg = encodeURIComponent(msg);
    // const nohp = result.nohp;

    // try {
    //   const url = 'http://localhost:60000?nohp=' + nohp + '&msg=' + msg;
    //   console.log(url);
    //   await axios.get(url);
    //   ret.sent = true;
    // } catch (err) {
    //   console.error(err);
    // }

    if (numSent === 0) {
      try {
        await this.wabotService.sendOTP(nohp, otp);
        await this.prismaService.tblpemilih.update({
          data: { numSent: numSent + 1 },
          where: { NoReg },
        });
        ret.sent = true;
        ret.numSent = numSent + 1;
      } catch (err) {
        console.error(err);
      }
    }

    return ret;
  }

  @Get('sendotpagain/:noreg')
  async sendotpagain(@Param('noreg') noReg: string) {
    const where: Prisma.tblpemilihWhereUniqueInput = { NoReg: noReg };
    const result = await this.prismaService.tblpemilih.findUnique({
      where,
      include: {
        pilihanPertama: true,
        pilihanKedua: true,
        pilihanKeduaPPJ: true,
      },
    });

    const numSent = result.numSent;
    const NoReg = result.NoReg;

    let otp = result.otp;
    const nohp = result.nohp.trim();

    if (!otp) {
      otp = (Math.floor(Math.random() * 999999) + '').padStart(6, '0');
      await this.prismaService.tblpemilih.update({
        data: {
          nohp: result.nohp.trim(),
          otp,
        },
        where,
      });
    }

    const ret = {
      sent: false,
    };

    if (numSent <= 1) {
      try {
        await this.wabotService.sendOTP(nohp, otp);
        await this.prismaService.tblpemilih.update({
          data: { numSent: numSent + 1 },
          where: { NoReg },
        });
        ret.sent = true;
      } catch (err) {
        console.error(err);
      }
    }

    return ret;
  }

  @Get('verifyotp/:noreg/:otp')
  async verifyotp(@Param('noreg') noReg: string, @Param('otp') otp: string) {
    try {
      const where: Prisma.tblpemilihWhereUniqueInput = { NoReg: noReg };
      const result = await this.prismaService.tblpemilih.findUnique({
        where,
        include: {
          pilihanPertama: true,
          pilihanKedua: true,
          pilihanKeduaPPJ: true,
        },
      });

      if (result.numTry >= 10) throw new Error('blocked');

      await this.prismaService.tblpemilih.update({
        where,
        data: {
          numTry: result.numTry > 0 ? result.numTry + 1 : 1,
        },
      });

      if (result.otp !== otp) throw new Error('invalid otp');

      const token = await this.jwtService.signAsync({
        noReg,
      });

      return {
        token,
      };
    } catch (err) {
      const errMsg = err && err.message ? err.message : 'unknown error';
      throw new HttpException(errMsg, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('data')
  async data(@Request() req) {
    const noReg = req.noReg;
    const result = await this.prismaService.tblpemilih.findUnique({
      where: { NoReg: noReg },
    });

    const Wil = result.Wil;
    const Tahap = 1;

    const kuotaMJ = await this.prismaService.tblkuota.findFirst({
      where: { Wil, Tahap, Posisi: 1 },
    });

    const kuotaPPJ = await this.prismaService.tblkuota.findFirst({
      where: { Wil, Tahap, Posisi: 2 },
    });

    const calon = await this.prismaService.tblcalon.findMany({
      where: {
        Wil,
      },
      select: {
        NoId: true,
        Nama: true,
        Wil: true,
        Umur: true,
        Gender: true,
        Penatua: true,
        PPJ: true,
        Total: false,
        TotalPPJ: false,
      },
    });

    return {
      noReg,
      wilayah: Wil,
      kuotaMJ: kuotaMJ.jumlah,
      kuotaPPJ: kuotaPPJ.jumlah,
      calon,
    };
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('data')
  async saveData(
    @Body('mj') mjStr: string,
    @Body('ppj') ppjStr: string,
    @Request() req,
  ) {
    try {
      const noReg = req.noReg;
      const result = await this.prismaService.tblpemilih.findUnique({
        where: { NoReg: noReg },
      });

      const mjIds = _.uniq(mjStr.split(','));
      const ppjIds = _.uniq(ppjStr.split(','));
      const ids = mjIds.concat(ppjIds);

      const Wil = result.Wil;
      const Tahap = 1;

      const kuotaMJ = await this.prismaService.tblkuota.findFirst({
        where: { Wil, Tahap, Posisi: 1 },
      });

      const kuotaPPJ = await this.prismaService.tblkuota.findFirst({
        where: { Wil, Tahap, Posisi: 2 },
      });

      if (mjIds.length < kuotaMJ.jumlah || mjIds.length > kuotaMJ.jumlah + 2)
        throw new Error('Kuota calon penatua tidak sesuai.');
      if (ppjIds.length !== kuotaPPJ.jumlah)
        throw new Error('Kuota calon ppj tidak sesuai.');

      const dataMJ = mjIds.map((obj) => {
        const a: Prisma.PilihanPertamaCreateManyInput = {
          calonNoId: obj,
          pemilihNoReg: noReg,
          posisi: 'PENATUA',
        };
        return a;
      });

      const dataPPJ = ppjIds.map((obj) => {
        const a: Prisma.PilihanPertamaCreateManyInput = {
          calonNoId: obj,
          pemilihNoReg: noReg,
          posisi: 'PPJ',
        };
        return a;
      });

      const dataALL = dataMJ.concat(dataPPJ);
      const prisma = this.prismaService;

      await prisma.$transaction([
        prisma.pilihanPertama.deleteMany({
          where: {
            pemilihNoReg: noReg,
          },
        }),
        prisma.pilihanPertama.createMany({
          data: dataALL,
        }),
      ]);

      // await this.prismaService.pilihanPertama.deleteMany({
      //   where: {
      //     pemilihNoReg: noReg,
      //   },
      // });

      // await this.prismaService.pilihanPertama.createMany({
      //   data: dataMJ,
      // });

      // await this.prismaService.pilihanPertama.createMany({
      //   data: dataPPJ,
      // });

      const pilihan = await this.prismaService.pilihanPertama.findMany({
        where: {
          pemilihNoReg: noReg,
        },
        include: {
          calon: true,
        },
      });

      for (const id of ids) {
        await this.calon1Service.updateTotal(id);
      }

      return pilihan;
    } catch (err) {
      const errMsg = err && err.message ? err.message : 'unknown error';
      throw new HttpException(errMsg, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('data2')
  async data2(@Request() req) {
    const noReg = req.noReg ? req.noReg : '0';
    await this.prismaService.tblpemilih.findUnique({
      where: { NoReg: noReg },
    });

    const rows = [];
    const ret = {
      noReg,
      penatua: [],
      ppj: [],
    };

    for (let i = 0; i < 12; i++) {
      const Wil = (i + 1 + '').padStart(2, '0');
      const Tahap = 2;

      const kuotaMJ = await this.prismaService.tblkuota.findFirst({
        where: { Wil, Tahap, Posisi: 1 },
      });

      console.log(kuotaMJ);

      const kuotaPPJ = await this.prismaService.tblkuota.findFirst({
        where: { Wil, Tahap, Posisi: 2 },
      });

      console.log(kuotaPPJ);

      const calon = await this.prismaService.tblcalon2.findMany({
        where: {
          Wil,
          Jabatan: 'PENATUA',
        },
        select: {
          NoId: true,
          Nama: true,
          Wil: true,
          Umur: true,
          Gender: true,
          Jabatan: true,
          Ranking: true,
        },
      });

      rows.push({
        wilayah: Wil,
        kuotaMJ: kuotaMJ.jumlah,
        calon,
      });
    }

    ret.penatua = rows;

    const calonppj = await this.prismaService.tblcalon2.findMany({
      where: {
        Jabatan: 'PPJ',
      },
      select: {
        NoId: true,
        Nama: true,
        Wil: true,
        Umur: true,
        Gender: true,
        Jabatan: true,
        Ranking: true,
      },
    });

    ret.ppj = calonppj;

    return ret;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('data2')
  async saveData2(
    @Body('mjs') mjs: any, // [{Wil,pilihan:[string]}]
    @Body('ppjs') ppjs: Array<string>, // [string]
    @Request() req,
  ) {
    try {
      const noReg = req.noReg ? req.noReg : '0';
      await this.prismaService.tblpemilih.findUnique({
        where: { NoReg: noReg },
      });

      const ppjIds: Array<string> = _.uniq(ppjs);
      const MAX_PPJ = 7;
      if (ppjIds.length !== MAX_PPJ) throw new Error('Kuota PPJ tidak valid.');

      const Tahap = 2;
      const toSave = [];

      const check = _.uniq(_.map(mjs, 'Wil'));
      if (check.length !== 12) throw new Error('Data belum lengkap');

      // validasi kuota & pilihan
      for (let i = 0; i < mjs.length; i++) {
        const mj = mjs[i];
        const Wil = mj.Wil;
        const pilihan: Array<string> = _.uniq(mj.pilihan);

        const kuotaMJ = await this.prismaService.tblkuota.findFirst({
          where: { Wil, Tahap, Posisi: 1 },
        });

        if (pilihan.length !== kuotaMJ.jumlah)
          throw new Error(
            'Kuota wilayah ' + Wil + ' tidak valid. ' + kuotaMJ.jumlah,
          );

        const calon = await this.prismaService.tblcalon2.findMany({
          where: {
            Wil,
            Jabatan: 'PENATUA',
          },
        });

        const valid = calon.map((row) => {
          return row.NoId;
        });

        for (let j = 0; j < pilihan.length; j++) {
          const NoId = pilihan[j];
          if (valid.indexOf(NoId) < 0)
            throw new Error(
              'Pilihan wilayah ' + Wil + ': ' + NoId + ' tidak valid.',
            );

          const a: Prisma.PilihanKeduaCreateManyInput = {
            pemilihNoReg: noReg,
            calonNoId: NoId,
          };

          toSave.push(a);
        }
      }

      for (let i = 0; i < ppjIds.length; i++) {
        const a: Prisma.PilihanKeduaCreateManyInput = {
          pemilihNoReg: noReg,
          calonNoId: ppjIds[i],
        };
        toSave.push(a);
      }

      const prisma = this.prismaService;

      await prisma.$transaction([
        prisma.pilihanKedua.deleteMany({
          where: {
            pemilihNoReg: noReg,
          },
        }),
        prisma.pilihanKedua.createMany({
          data: toSave,
        }),
      ]);

      const pilihan = await this.prismaService.pilihanKedua.findMany({
        where: {
          pemilihNoReg: noReg,
        },
        include: {
          calon: true,
        },
      });

      await this.calon1Service.updateTotal2();

      return {
        pilihan,
      };
    } catch (err) {
      const errMsg = err && err.message ? err.message : 'unknown error';
      throw new HttpException(errMsg, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
