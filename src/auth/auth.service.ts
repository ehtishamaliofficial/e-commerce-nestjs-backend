import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { hashPassword } from 'utils/bcrpyt';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(createUserDto: CreateUserDto) {
    const {
      email,
      password,
      username,
      firstname,
      lastname,
      phoneNumber,
      country,
      city,
      postalCode,
    } = createUserDto;
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

      return {
        message: 'User created successfully',
        success: true,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
