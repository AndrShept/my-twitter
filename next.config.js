/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [
      'help.twitter.com',
      'lh3.googleusercontent.com',
      'images.unsplash.com',
      'randomuser.me',
      'res.cloudinary.com',
      "cdn-icons-png.flaticon.com"
    ],
  },
};

module.exports = nextConfig;
