import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersService } from 'users/users.service';
import { AccessTokenPayload } from './auth.types';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private userService: UsersService) {}

  createAccessToken(user: User) {
    const payload = this.createAccessTokenPayload(user);
    return this.jwtService.sign(payload);
  }

  createAccessTokenPayload(user: User): Pick<AccessTokenPayload, 'username' | 'sub'> {
    return { username: user.email, sub: user.id };
  }

  async registerUser(email: string, password: string) {
    return await this.userService.create({
      email,
      password,
    });
  }
}
