import { Controller, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { LocalAuthGuard } from 'auth/guards/local-auth.guard';
import { AuthService } from './auth.service';
import { AuthUser } from './decorators/auth-user.decorator';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginInput, LoginOutput } from './auth.dto';
import { HttpCode } from '@nestjs/common';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({ type: LoginInput })
  @ApiResponse({ status: 200, description: 'Successful login.', type: LoginOutput })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  async login(@AuthUser() user: User) {
    const accessToken = this.authService.createAccessToken(user);

    return {
      userId: user.id,
      accessToken,
    };
  }
}
