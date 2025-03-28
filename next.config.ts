import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  images: {
    remotePatterns: [
      {
        protocol: "https", 
        hostname: "storage.googleapis.com",
        pathname: "/**", 
      },
      {
        protocol: "https", 
        hostname: "mesascout.com.br",
        pathname: "/**", 
      },
      {
        protocol: "https", 
        hostname: "localhost",
        port: "3000",
        pathname: "/**", 
      },
    ],
  },
};

export default nextConfig;
