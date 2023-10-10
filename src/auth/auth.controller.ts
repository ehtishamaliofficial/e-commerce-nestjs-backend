import {
  Body,
  Controller,
  HttpCode,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { create } from 'domain';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'interface/Respose';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        message: { type: 'string' },
      },
    },
  })
  @HttpCode(201)
  async register(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
  ): Promise<Response> {
    return this.authService.register(createUserDto);
  }

  @Post('/login')
  async login(@Body(new ValidationPipe()) loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
