import { UserRole } from '@mono/shared';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private roles: UserRole[]) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { user } = context.switchToHttp().getRequest();
    return this.roles.some((role) => user.role === role);
  }
}
