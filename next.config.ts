import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    plugins: [
        require("tailwindcss-animate"),
    ],
};

export default nextConfig;
