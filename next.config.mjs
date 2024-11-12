/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://white-clinic-for-feedback-auij.vercel.app/:path*',
      },
    ];
  },
};

export default nextConfig;
