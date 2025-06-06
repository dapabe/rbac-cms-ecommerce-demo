import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { ContentModule } from './product/product.module';
import * as path from 'node:path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        path.join(process.cwd(), '.env.production'),
        path.join(process.cwd(), '.env.development'),
      ],
      cache: true,
      load: [
        () => ({
          NODE_ENV: process.env.NODE_ENV,
          PORT: parseInt(process.env.PORT, 10),
          JWT_SECRET: process.env.JWT_SECRET,
          FRONTEND_URL: process.env.FRONTEND_URL,
        }),
      ],
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: path.resolve(process.cwd(), '..', '.temp', 'cms.sqlite'),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
    AuthModule,
    ContentModule,
  ],
})
export class AppModule {}
