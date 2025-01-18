import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // dynamicIO: true,
    cacheLife: {
      footItems: {
        stale: 3600, // 1 hour
        revalidate: 900, // 15 minutes
        expire: 86400, // 1 day
      },
    },
  },
};

export default nextConfig;
