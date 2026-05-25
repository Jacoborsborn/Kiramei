import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    qualities: [100, 75],
  },
  async redirects() {
    return [
      // /training is now the homepage. Belt-and-braces 301 in case the
      // route-level redirect (app/training/page.tsx) is ever removed.
      { source: '/training', destination: '/', permanent: true },
    ]
  },
}

export default nextConfig
