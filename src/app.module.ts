import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { Calon1Module } from './calon1/calon1.module';
import { PrismaService } from './prisma.service';
import { AdminModule } from './admin/admin.module';
import { PemilihModule } from './pemilih/pemilih.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { WabotModule } from './wabot/wabot.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../public'),
    }),
    ScheduleModule.forRoot(),
    UsersModule,
    AuthModule,
    Calon1Module,
    AdminModule,
    PemilihModule,
    WabotModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
