/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
}

module.exports = {
  theme: {
    extend: {
      images: {
        domains: ['ipfs.moralis.io', 'polygonscan.com'],
      },
      backgroundImage: {
        'hero-pattern': "url('/public/landing-page-bg.png",
      },
    },
  },
}
