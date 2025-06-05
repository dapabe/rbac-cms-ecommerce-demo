import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { ContentModule } from './content/content.module';
import { TypedEnv } from './common/TypedEnv';
import * as path from 'node:path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.join(process.cwd(), '.env'),
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: path.resolve(process.cwd(), '..', '.temp', 'cms.sqlite'),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    JwtModule.register({
      global: true,
      secret: TypedEnv.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
    AuthModule,
    ContentModule,
  ],
})
export class AppModule {}
