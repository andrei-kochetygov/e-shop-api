import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'users/users.service';
import { PasswordsService } from 'passwords/passwords.service';
import { User } from '@prisma/client';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService, private passwordsService: PasswordsService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.usersService.findOne({ email });

    if (!user || !this.passwordsService.compare(password, user.password)) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
