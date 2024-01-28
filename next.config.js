/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["img.clerk.com", "firebasestorage.googleapis.com", 'images.pexels.com', 'res.cloudinary.com'],
  },
};

module.exports = nextConfig;
