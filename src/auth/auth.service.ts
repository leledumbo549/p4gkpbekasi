import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async getUser(username: string, password: string): Promise<User | null> {
    return this.usersService.verifyAndGet(username, password);
  }

  async getToken(user: any) {
    const payload = { userId: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
