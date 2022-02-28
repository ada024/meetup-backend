/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['assets.simpleviewcms.com', 'media.istockphoto.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  swcMinify: false,
}

module.exports = nextConfig
