import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { ContentModule } from './content/content.module';
import { TypedEnv } from './common/TypedEnv';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'cms.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
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
