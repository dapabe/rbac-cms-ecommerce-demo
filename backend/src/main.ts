import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TypedEnv } from './common/TypedEnv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin:
        process.env.NODE_ENV === 'development'
          ? ['http://localhost:4321', 'http://localhost:3000']
          : TypedEnv.FRONTEND_URL,
      credentials: true,
    },
  });

  app.setGlobalPrefix('api');

  await app.listen(TypedEnv.PORT);
  console.log(`CMS Backend running on port http://localhost:${TypedEnv.PORT}`);
}
void bootstrap();
