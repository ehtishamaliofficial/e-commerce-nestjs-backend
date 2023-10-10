import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { comparePassword, hashPassword } from 'utils/bcrpyt';
import { LoginDto } from './dto/login.dto';
import { Response } from 'interface/Respose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<Response> {
    const { email, password, username } = createUserDto;
    try {
      const isExitsEmail = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });
      const isExitsUsername = await this.prisma.user.findUnique({
        where: {
          username,
        },
      });
      if (isExitsEmail) {
        throw new BadRequestException('Email already exists');
      }
      if (isExitsUsername) {
        throw new BadRequestException('Username already exists');
      }
      const hashedPassword = await hashPassword(password);
      const user = await this.prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });
      console.log(user);
      user.password = undefined;
      const token = await this.jwtService.sign({
        user,
      });

      return {
        message: 'User created successfully',
        success: true,
        data: {
          token,
          user,
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async login(loginDto: LoginDto): Promise<Response> {
    const { email, password } = loginDto;
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (!user) {
        throw new BadRequestException('Email or password is incorrect');
      }
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        throw new BadRequestException('Email or password is incorrect');
      }
      const token = this.jwtService.sign({
        userId: user.id,
        username: user.username,
        email: user.email,
      });
      user.password = undefined;
      return {
        message: 'Login successfully',
        success: true,
        data: {
          token,
          user,
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
