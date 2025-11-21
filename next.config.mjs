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
    // Use webpack instead of turbopack for build to avoid edge runtime issues
    turbo: false,
  },
  // Skip pre-rendering for API routes during build
  generateBuildId: async () => {
    return 'build-' + Date.now()
  },
  // Completely disable static optimization for API routes
  generateStaticParams: false,
}

export default nextConfig
