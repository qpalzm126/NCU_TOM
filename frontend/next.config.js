/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three'],
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'images.unsplash.com',
            port: '',
          },
          {
            protocol: 'https',
            hostname: 'flowbite.s3.amazonaws.com',
            port: '',
          }
        ],
      },
}

module.exports = nextConfig
