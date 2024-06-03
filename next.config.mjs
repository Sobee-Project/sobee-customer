/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "localhost"
      },
      {
        hostname: "avatar.iran.liara.run"
      },
      {
        hostname: "res.cloudinary.com"
      }
    ]
  },
  output: "standalone"
}

export default nextConfig
