import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'interface/Respose';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async addProfile(
    createProfileDto: CreateProfileDto,
    userId: string,
  ): Promise<Response> {
    try {
      const profile = await this.prisma.profile.create({
        data: {
          firstName: createProfileDto.firstname,
          lastName: createProfileDto.lastname,
          phoneNumber: createProfileDto.phoneNumber,
          country: createProfileDto.country,
          city: createProfileDto.city,
          postalCode: createProfileDto.postalCode,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
      return {
        message: 'Profile created successfully',
        success: true,
        data: {
          profile,
        },
      };
    } catch (error) {
      new BadRequestException(error.message);
    }
  }

  async getUserProfile(userId: string): Promise<Response> {
    try {
      const profile = await this.prisma.profile.findUnique({
        where: {
          userId,
        },
        include: {
          user: true,
        },
      });

      if (!profile) {
        throw new BadRequestException('Profile not found');
      }

      profile.user.password = undefined;
      return {
        message: 'Profile fetched successfully',
        success: true,
        data: {
          profile,
        },
      };
    } catch (error) {
      new BadRequestException(error.message);
    }
  }
}
