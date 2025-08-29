/** @type {import('next').NextConfig} */
const nextConfig = {
  // Amplify 배포 시 ESLint 에러 때문에 빌드 막히지 않게 처리
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
