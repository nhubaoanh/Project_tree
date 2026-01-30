import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Output export cho static deployment
  output: "export",
  
  // Tắt image optimization cho static export
  images: {
    unoptimized: true,
  },
  
  // Tắt strict mode trong production để tránh double render
  reactStrictMode: process.env.NODE_ENV === "development",
};

export default nextConfig;
