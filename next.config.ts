import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.3"],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "makerworld.bblmw.com",
      },
    ],
  },
};

export default nextConfig;