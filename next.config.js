/** @type {import('next').NextConfig} */
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
  },
  experimental: {
    mdxRs: true,
  },
  // Bundle optimization
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
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
            chunks: 'all',
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
            chunks: 'all',
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

module.exports = withMDX(nextConfig)