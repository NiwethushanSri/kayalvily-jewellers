// Designed and Developed by Forge9x Ltd
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  // /admin uploads photos through a server action; the default 1 MB limit is too small for them.
  experimental: { serverActions: { bodySizeLimit: "5mb" } },
};

export default nextConfig;
