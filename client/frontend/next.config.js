/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
    WS_URL: process.env.WS_URL,
    CREATE_ROOM_URL: process.env.CREATE_ROOM_URL,
  },
  
}

module.exports = nextConfig
