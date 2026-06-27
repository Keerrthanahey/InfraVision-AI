import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
  transpilePackages: ["@splinetool/react-spline", "@splinetool/runtime"],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@splinetool/react-spline": path.resolve(
        __dirname,
        "node_modules/@splinetool/react-spline/dist/react-spline-next.js"
      ),
    };
    return config;
  },
};

export default nextConfig;
