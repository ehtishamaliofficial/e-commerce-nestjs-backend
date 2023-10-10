import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsPostalCode, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty()
  username: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  password: string;
}
