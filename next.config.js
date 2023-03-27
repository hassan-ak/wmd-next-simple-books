/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    // BASE_URL: 'http://localhost:3000', //Development
    BASE_URL: 'https://wmd-next-simple-books.vercel.app', //Production
  },
}

module.exports = nextConfig
