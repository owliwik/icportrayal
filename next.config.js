/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript:{
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.placehold.co',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      // 添加你的 Supabase 域名
      {
        protocol: 'https',
        hostname: 'fxehqztapwouuyvpafce.supabase.co',
        pathname: '/**',
      },
      // 如果需要本地图片
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
    ],
    // 或者使用 domains 配置（更简单）
    domains: [
      'placehold.co',
      'images.unsplash.com', // 如果需要可以使用其他图片源
      'picsum.photos', // 另一个占位图服务
      'fxehqztapwouuyvpafce.supabase.co',
      'localhost',
    ],
  },
  // 可选：提高图片质量
  experimental: {
    optimizeCss: true,
  },
}

module.exports = nextConfig