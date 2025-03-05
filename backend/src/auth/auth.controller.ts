import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  Response,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { RegisterUserDto } from 'src/users/dtos/register-user.dto';
import { LoginUserDto } from 'src/users/dtos/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() dto: RegisterUserDto) {
    const user = await this.usersService.register(dto);
    return { message: 'User registered', user };
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Response() res) {
    const user = await this.authService.validateUser(
      loginUserDto.email,
      loginUserDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const token = await this.authService.generateToken(user);

    res.cookie('access_token', token.access_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.json({ message: 'Logged in successfully' });
  }
}
