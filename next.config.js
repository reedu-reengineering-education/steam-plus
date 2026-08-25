/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Next 12.2.2's `next export` gate still checks the pre-stable
  // location for this flag (fixed in later 12.x patches) — set both.
  experimental: {
    images: {
      unoptimized: true,
    },
  },
}

module.exports = nextConfig
