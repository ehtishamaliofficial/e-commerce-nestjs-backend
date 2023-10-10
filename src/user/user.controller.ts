import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateProfileDto } from './dto/create-profile.dto';
import { User } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'interface/Respose';

@Controller('user')
@ApiTags('User')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('profile')
  @ApiBearerAuth()
  async addProfile(
    @Body(new ValidationPipe()) createProfileDto: CreateProfileDto,
    @Body('user') user: User,
  ): Promise<Response> {
    return this.userService.addProfile(createProfileDto, user.id);
  }

  @Get('profile')
  @ApiBearerAuth()
  async getUserProfile(@Body('user') user: User): Promise<Response> {
    return this.userService.getUserProfile(user.id);
  }
}
