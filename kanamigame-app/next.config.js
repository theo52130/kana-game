/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Active le mode strict pour détecter les problèmes
  output: 'standalone', // Forcer le mode dynamique
  staticPageGenerationTimeout: 1000,
};

module.exports = nextConfig;
