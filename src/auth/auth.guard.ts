import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const authHeader = request.headers.authorization;
      if (!authHeader) {
        throw new UnauthorizedException();
      }
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException();
      }
      const decode = this.jwtService.verify(token, {
        secret: 'JHBIYoibuo89vv878v878V&87707&v9070979797v7797v',
      });
      request.body.user = decode.user;
      return true;
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
  }
}
