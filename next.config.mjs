/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: "http://localhost:3000",
    DB_LOCAL_URI: "mongodb://127.0.0.1:27017/bookit",
    DB_URI: "mongodb://127.0.0.1:27017/bookit",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
