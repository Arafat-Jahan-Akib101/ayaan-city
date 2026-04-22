/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // <--- This line is critical for GitHub Pages
  images: {
    unoptimized: true, // <--- Required since GitHub Pages doesn't support Next.js image optimization
  },
}

module.exports = nextConfig
