import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["storage.googleapis.com", "mesascout.com.br"], 
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000", 
      },
    ],
  },
};

export default nextConfig;

