import { IsEmail, IsPostalCode, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  country: string;

  @IsString()
  city: string;

  @IsPostalCode()
  postalCode: string;

  @IsString()
  password: string;
}
