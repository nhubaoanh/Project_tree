import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Bật lại static export cho hosting
  output: "export",
  
  // Thêm trailing slash để fix routing issues
  trailingSlash: true,
  
  // Tắt image optimization cho static export
  images: {
    unoptimized: true,
  },
  
  // Tắt strict mode trong production để tránh double render
  reactStrictMode: process.env.NODE_ENV === "development",
};

export default nextConfig;
