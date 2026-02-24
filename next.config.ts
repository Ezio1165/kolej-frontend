/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Yerel geliştirmede 'private ip' hatasını aşmak için optimizasyonu kapatıyoruz.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;