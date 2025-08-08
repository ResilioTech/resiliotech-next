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
}

module.exports = withMDX(nextConfig)