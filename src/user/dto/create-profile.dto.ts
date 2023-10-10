import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @ApiProperty()
  firstname: string;

  @IsString()
  @ApiProperty()
  lastname: string;

  @IsString()
  @ApiProperty()
  phoneNumber: string;

  @IsString()
  country: string;

  @IsString()
  @ApiProperty()
  city: string;

  @IsString()
  @ApiProperty()
  postalCode: string;
}
