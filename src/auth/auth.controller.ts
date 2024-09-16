import { Controller, Post, Get, Body, UnauthorizedException, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsString, MinLength } from 'class-validator';
import { JwtService } from '@nestjs/jwt';
import { ApiProperty } from '@nestjs/swagger';
import { LocalAuthGuard } from './local.guard';

class AuthLoginDTO {
  @ApiProperty({ example: 'admin' })
  @IsString()
  username: string;

  @ApiProperty({ example: '123123' })
  @IsString()
  @MinLength(6)
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) { }

  // @Post()
  // async login(@Body() dto: AuthLoginDTO) {
  //   const user = await this.authService.loginByEmail(dto.email, dto.password);
  //   if (!user) throw new UnauthorizedException();

  //   const access_token = await this.jwtService.signAsync({ userId: user.id });
  //   return {
  //     access_token,
  //     user: user as User,
  //   };
  // }

  @UseGuards(LocalAuthGuard)
  @Post('local/login')
  async loginLocal(@Body() dto: AuthLoginDTO, @Request() req) {
    const user = req.user;
    return this.authService.getToken(req.user);
  }

}

// curl -X POST http://localhost:3000/auth/login -d '{"username": "admin", "password": "123123"}' -H "Content-Type: application/json"
// curl --request GET --url http://localhost:5000/auth/login2 --header 'authorization: Bearer X'