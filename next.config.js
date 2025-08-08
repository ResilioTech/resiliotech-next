/** @type {import('next').NextConfig} */
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      // Use dynamic import for ES modules
      () => import('remark-gfm').then(mod => mod.default),
    ],
    rehypePlugins: [
      require('rehype-slug'),
      require('rehype-autolink-headings'),
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
}

module.exports = withMDX(nextConfig)