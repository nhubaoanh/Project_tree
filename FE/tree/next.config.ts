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
  },
  
  // Tắt strict mode trong production để tránh double render
  reactStrictMode: process.env.NODE_ENV === "development",
};

export default nextConfig;
