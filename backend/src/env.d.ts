declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      JWT_SECRET: string;
      PORT: string;
      FRONTEND_URL: string;
    }
  }
}

export {};
