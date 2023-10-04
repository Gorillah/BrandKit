import withPlaiceholder from "@plaiceholder/next";

/**
 * @type {import('next').NextConfig} 
 */
const config = {
  // your Next.js config
};

export default withPlaiceholder({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'oaidalleapiprodscus.blob.core.windows.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
});