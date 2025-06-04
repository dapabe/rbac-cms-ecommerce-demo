import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityUser } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserToken } from 'src/common/types/user-token';
import { IAuthDTOSchema, UserRole } from '@mono/shared';

@Injectable()
export class AuthService {
  private isDev = process.env.NODE_ENV === 'development';
  constructor(
    @InjectRepository(EntityUser) private userRepo: Repository<EntityUser>,
    private jwtService: JwtService,
  ) {
    this.createDefaultAdmin();
  }

  private async createDefaultAdmin() {
    let exists = await this.userRepo.exists({
      where: { role: UserRole.ADMIN },
    });
    if (!exists) {
      const hashedPassword = await bcrypt.hash('admin', 10);
      const admin = this.userRepo.create({
        username: 'admin',
        password: hashedPassword,
        role: UserRole.ADMIN,
      });
      await this.userRepo.save(admin);
      console.log('Default admin user created: admin/admin');
    }

    exists = await this.userRepo.exists({
      where: { role: UserRole.GUEST },
    });
    if (!exists) {
      const hashedPassword = await bcrypt.hash('admin', 10);
      const guest = this.userRepo.create({
        username: 'guest',
        password: hashedPassword,
        role: UserRole.GUEST,
      });
      await this.userRepo.save(guest);
    }
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<IAuthDTOSchema['Read'] | null> {
    const user = await this.userRepo.findOne({ where: { username } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(username: string, password: string): Promise<UserToken> {
    // Only allow admin login in development mode

    if (!this.isDev && username === 'admin') {
      throw new ForbiddenException(
        'Admin login only available in development mode',
      );
    }

    const user = await this.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      username: user.username,
      id: user.id,
      role: user.role,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: payload,
    };
  }
}
