import { z } from 'zod';

export const TypedEnv = z
  .object({
    JWT_SECRET: z.string().min(1).default('default_jwt_secret'),
    FRONTEND_URL: z.string().url(),
    PORT: z.coerce.number().default(3001),
  })
  .parse(process.env);
