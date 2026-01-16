import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Output standalone cho Docker deployment
  output: "standalone",
  
  // Cho phép load ảnh từ external sources
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    // Thêm quality 80 vào config để tránh warning
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
  },
  
  // Tắt strict mode trong production để tránh double render
  reactStrictMode: process.env.NODE_ENV === "development",
};

export default nextConfig;
