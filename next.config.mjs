/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  reactStrictMode: false,
  experimental: {
    serverActions: {
      allowedOrigins: ["vc-silk-eta.vercel.app"],
    },
  },
  // Skip pre-rendering for API routes during build
  generateBuildId: async () => {
    return 'build-' + Date.now()
  },
}

export default nextConfig
