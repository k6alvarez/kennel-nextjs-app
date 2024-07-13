/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  canary: true,
  env: {
    cloudinaryUrl: `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
