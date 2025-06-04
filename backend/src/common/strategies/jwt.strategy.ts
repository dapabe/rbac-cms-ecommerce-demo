import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserToken } from '../types/user-token';
import { TypedEnv } from '../TypedEnv';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: TypedEnv.JWT_SECRET,
    });
  }

  validate(payload: UserToken['user']) {
    return {
      userId: payload.id,
      username: payload.username,
      role: payload.role,
    };
  }
}
