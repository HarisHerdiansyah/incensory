import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-9aae71d040b24b59ad3587c89ead1aa4.r2.dev',
        pathname: '/**',
      },
    ],
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
