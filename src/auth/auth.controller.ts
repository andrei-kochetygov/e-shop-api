import { Controller, Post, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { LocalAuthGuard } from 'auth/guards/local-auth.guard';
import { UsersService } from 'users/users.service';
import { AuthService } from './auth.service';
import { AuthUser } from './decorators/auth-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private jwtService: JwtService, private userService: UsersService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@AuthUser() user: User) {
    const accessToken = this.authService.createAccessToken(user);

    return {
      userId: user.id,
      accessToken,
    };
  }
}
