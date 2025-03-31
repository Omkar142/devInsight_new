// client/next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['www.gravatar.com', 'avatars.githubusercontent.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:slug*',
        destination: 'http://localhost:5000/api/:slug*',
      },
    ];
  },
};

module.exports = nextConfig;

