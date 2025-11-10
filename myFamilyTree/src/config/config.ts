import env from '@ltv/env'
import * as dotenv from 'dotenv'
dotenv.config();

export const config = {
  port: env.int("PORT", 6001),
  db: {
    host: env("DB_HOST", "127.0.0.1"),
    port: env.int("DB_PORT", 3306),
    username: env("DB_USERNAME", "root"),
    password: env("DB_PASSWORD", "bao123@"),
    database: env("DB_NAME", "familytree"),
  },
  jwt: {
    secret: env('JWT_SECRET', 'thong tin cua gia dinh toi nhe 21'),
    expiresIn: env('JWT_EXPIRES_IN', '24h') 
  },
};