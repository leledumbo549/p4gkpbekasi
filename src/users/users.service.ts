import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(username: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user: User = await this.prismaService.user.create({
      data: { username, password: hashedPassword },
    });
    return user;
  }

  async verifyAndGet(username: string, password: string): Promise<User | null> {
    const user: User = await this.prismaService.user.findUnique({
      where: { username },
    });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const ret: User = await this.findUnique({ id: user.id });
        if (ret.password) delete ret.password;
        return ret;
      }
    }
    return null;
  }

  async findUnique(where: Prisma.UserWhereUniqueInput): Promise<User> {
    const user: User = await this.prismaService.user.findUnique({ where });
    return user;
  }
}
