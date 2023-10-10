import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'JHBIYoibuo89vv878v878V&87707&v9070979797v7797v',
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
})
export class AuthModule {}
