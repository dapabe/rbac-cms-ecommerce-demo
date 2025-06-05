import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const conf = app.get(ConfigService);

  app.enableCors({
    credentials: true,
    origin: conf.get('FRONTEND_URL'),
  });
  const PORT = conf.get('PORT') as number;
  app.setGlobalPrefix('api/v1');

  await app.listen(PORT);
  Logger.debug(
    `CMS Backend is running in '${conf.get('NODE_ENV')}' mode on ${await app.getUrl()}`,
  );
}
void bootstrap();
