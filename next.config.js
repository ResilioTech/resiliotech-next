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

const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    unoptimized: true,
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
    optimizePackageImports: ['lucide-react'],
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
      { source: '/services/:path+', destination: '/services', permanent: true },
      { source: '/projects/:path+', destination: '/services', permanent: true },
      { source: '/founding-pilot', destination: '/services', permanent: true },
      { source: '/changelog', destination: '/', permanent: true },
      
      // Fix 404s for legacy blog posts (Error 1)
      { source: '/blog/cicd-github-actions-guide', destination: '/blog', permanent: true },
      { source: '/blog/devops-blueprint-seed-to-series-a', destination: '/blog', permanent: true },
      { source: '/blog/fluxcd-kustomize-prod-ready', destination: '/blog', permanent: true },
      { source: '/blog/aws-cost-guardrails-terraform', destination: '/blog', permanent: true },
      { source: '/blog/getting-started-kubernetes-beginners', destination: '/blog', permanent: true },
      { source: '/blog/aws-cost-optimization-strategies', destination: '/blog', permanent: true },
      
      // Fix 404s for scraped email addresses
      { source: '/contact@resiliotech.com', destination: '/contact', permanent: true },
      { source: '/shivam@resiliotech.com', destination: '/contact', permanent: true },

      // Redirect legacy /changelog route (was returning 404; now indexed pages see redirect)
      { source: '/products/cloudwatch-pro', destination: '/services', permanent: true },
    ]
  },
}

module.exports = withBundleAnalyzer(withPWA(nextConfig))
