import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Allow GLB/GLTF files
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/files',
          outputPath: 'static/files/',
        },
      },
    });
    return config;
  },
  // Optional: Enable React Strict Mode
  reactStrictMode: true,
};

export default nextConfig;
