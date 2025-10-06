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
  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Split chunks for better caching and performance
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        maxAsyncRequests: 30,
        cacheGroups: {
          default: false,
          vendors: false,
          // Separate chunk for React and core libraries
          react: {
            name: 'react',
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
            chunks: 'all',
            priority: 40,
            enforce: true,
          },
          // Separate chunk for animation libraries (framer-motion is heavy)
          animations: {
            name: 'animations',
            test: /[\\/]node_modules[\\/](framer-motion)[\\/]/,
            chunks: 'async', // Load async to not block initial render
            priority: 30,
            enforce: true,
          },
          // Icons in separate chunk
          icons: {
            name: 'icons',
            test: /[\\/]node_modules[\\/](lucide-react)[\\/]/,
            chunks: 'all',
            priority: 25,
            enforce: true,
          },
          // Form libraries
          forms: {
            name: 'forms',
            test: /[\\/]node_modules[\\/](react-hook-form|@hookform)[\\/]/,
            chunks: 'async', // Forms typically below fold
            priority: 20,
            enforce: true,
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
      };
    }

    return config;
  },
  // Performance optimization
  swcMinify: true,
  reactStrictMode: true,
  poweredByHeader: false,
}

module.exports = withBundleAnalyzer(withPWA(withMDX(nextConfig)))
