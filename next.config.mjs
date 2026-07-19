/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { formats: ['image/avif', 'image/webp'] },
  headers: async () => [{ source: '/(.*)', headers: [
    { key: 'x-dns-prefetch-control', value: 'on' },
    { key: 'x-content-type-options', value: 'nosniff' },
    { key: 'cache-control', value: 'public, max-age=60, stale-while-revalidate=600' }
  ] }]
};
export default nextConfig;
