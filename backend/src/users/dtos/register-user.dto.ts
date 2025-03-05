import { IsString, IsEmail, Length } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @Length(2, 20)
  firstName: string;

  @IsString()
  @Length(2, 20)
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 20)
  password: string;
}
