import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    plugins: [
        require("tailwindcss-animate"),
    ],
};

export default withPayload(nextConfig);
