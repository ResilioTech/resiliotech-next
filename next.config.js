/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [],
})

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      // Use dynamic import for ES modules
      () => import('remark-gfm').then(mod => mod.default),
    ],
    rehypePlugins: [
      // Use dynamic imports for ES modules
      () => import('rehype-slug').then(mod => mod.default),
      () => import('rehype-autolink-headings').then(mod => mod.default),
    ],
  },
})

const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  compress: true,
  experimental: {
    mdxRs: true,
    optimizePackageImports: ['lucide-react', 'date-fns'],
  },
  // Bundle optimization
  compiler: {
    removeConsole: {
      exclude: ['error', 'warn'],
    },
  },
  // Use Next.js default webpack optimization (already optimized)
  // Performance optimization
  swcMinify: true,
  reactStrictMode: true,
  poweredByHeader: false,
  // Redirects for renamed products and legacy routes
  async redirects() {
    return [
      { source: '/services/:path*', destination: '/services', permanent: true },
      { source: '/products/:path*', destination: '/services', permanent: true },
      { source: '/projects/:path*', destination: '/services', permanent: true },
      { source: '/founding-pilot', destination: '/services', permanent: true },
      { source: '/changelog', destination: '/', permanent: true },
    ]
  },
}

module.exports = withBundleAnalyzer(withPWA(withMDX(nextConfig)))
