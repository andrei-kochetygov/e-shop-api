import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'users/users.service';
import { ConfigService } from '@nestjs/config';
import { configKeys } from 'configs/config-keys';
import { AccessTokenPayload } from 'auth/auth.types';
import { Inject } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(ConfigService) configService: ConfigService, private userService: UsersService) {
    console.log(configKeys.encryption.key);
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(configKeys.encryption.key),
    });
  }

  async validate(accessTokenPayload: AccessTokenPayload) {
    return this.userService.findOne({ id: accessTokenPayload.sub });
  }
}
