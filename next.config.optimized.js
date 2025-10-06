/** @type {import('next').NextConfig} */
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      () => import('remark-gfm').then(mod => mod.default),
    ],
    rehypePlugins: [
      () => import('rehype-slug').then(mod => mod.default),
      () => import('rehype-autolink-headings').then(mod => mod.default),
    ],
  },
})

// Optional: Add bundle analyzer for development
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],

  // Image optimization
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
    // Enable optimistic client cache (experimental)
    optimisticClientCache: true,
  },

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Security & Performance Headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          // Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.clarity.ms https://www.google-analytics.com;
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: blob: https://images.unsplash.com https://www.googletagmanager.com https://www.google-analytics.com;
              font-src 'self' data:;
              connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms https://region1.google-analytics.com;
              frame-src 'self' https://calendly.com;
              object-src 'none';
              base-uri 'self';
              form-action 'self';
              frame-ancestors 'self';
            `.replace(/\s{2,}/g, ' ').trim()
          }
        ],
      },
      // Cache static assets aggressively
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Preload critical fonts
      {
        source: '/',
        headers: [
          {
            key: 'Link',
            value: '</fonts/inter-var.woff2>; rel=preload; as=font; type=font/woff2; crossorigin=anonymous'
          }
        ]
      }
    ]
  },

  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev && !isServer) {
      // Advanced code splitting
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        maxAsyncRequests: 30,
        minSize: 20000,
        maxSize: 244000, // Split chunks larger than 244kb
        cacheGroups: {
          default: false,
          vendors: false,

          // Framework chunk (React, React-DOM)
          framework: {
            name: 'framework',
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
            chunks: 'all',
            priority: 40,
            enforce: true,
          },

          // Animation libraries (framer-motion is heavy - lazy load where possible)
          animations: {
            name: 'animations',
            test: /[\\/]node_modules[\\/](framer-motion)[\\/]/,
            chunks: 'async', // Load only when needed
            priority: 35,
            enforce: true,
          },

          // Icons
          icons: {
            name: 'icons',
            test: /[\\/]node_modules[\\/](lucide-react)[\\/]/,
            chunks: 'all',
            priority: 30,
            enforce: true,
          },

          // Form libraries
          forms: {
            name: 'forms',
            test: /[\\/]node_modules[\\/](react-hook-form|@hookform|zod)[\\/]/,
            chunks: 'async', // Forms are not always needed
            priority: 25,
            enforce: true,
          },

          // MDX and markdown
          markdown: {
            name: 'markdown',
            test: /[\\/]node_modules[\\/](@mdx-js|react-markdown|remark|rehype|unified|mdast|hast)[\\/]/,
            chunks: 'async',
            priority: 20,
            enforce: true,
          },

          // Common libraries used across multiple pages
          commons: {
            name: 'commons',
            minChunks: 2,
            priority: 15,
            reuseExistingChunk: true,
          },

          // Other vendors
          vendor: {
            name: 'vendors',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            minChunks: 1,
            reuseExistingChunk: true,
          },
        },
      }

      // Module concatenation for smaller bundles
      config.optimization.concatenateModules = true

      // Enable aggressive tree shaking
      config.optimization.usedExports = true
      config.optimization.sideEffects = true
    }

    // Ignore source maps in production for smaller bundles
    if (!dev) {
      config.devtool = false
    }

    return config
  },

  // Performance optimization
  swcMinify: true,
  reactStrictMode: true,
  poweredByHeader: false,

  // Optimize production bundle
  productionBrowserSourceMaps: false,

  // Optimize font loading
  optimizeFonts: true,
}

// Apply bundle analyzer only in development
module.exports = process.env.NODE_ENV === 'development'
  ? withBundleAnalyzer(withMDX(nextConfig))
  : withMDX(nextConfig)
