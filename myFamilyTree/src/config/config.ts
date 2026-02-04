import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const config = {
  port: process.env.PORT,

  // Base URL for file uploads
  baseUrl: process.env.BASE_URL,

  // Database configuration
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    charset: "utf8mb4",
  },

  // JWT configuration
  jwt: {
    secret: process.env.JWT_SECRET || "thong tin cua gia dinh toi nhe 21",
    expiresIn: process.env.JWT_EXPIRES_IN || "24h",
    refreshSecret:
      process.env.JWT_REFRESH_SECRET ||
      "refresh token secret gia dinh toi 2024",
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  },

  // Gateway configuration
  gatewaySecret: process.env.GATEWAY_SECRET || "family-tree-gateway-2024",

  // AI Service configuration
  aiServiceUrl: process.env.AI_SERVICE_URL || "http://localhost:7000",

  // API Keys
  groqApiKey: process.env.GROQ_API_KEY || "",
  geminiApiKey: process.env.GEMINI_API_KEY || "",
};